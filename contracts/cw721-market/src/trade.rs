use std::collections::BTreeMap;
use cosmwasm_std::{from_json, Addr, Coin, DepsMut, Empty, MessageInfo, Response, BankMsg, Uint128};
use cw721_multi::Cw721MultiReceiveMsg;
use crate::state::{Ask, COLLECTION, COMMISION_PRECISION, COMMISSION_RATE, NFTS_FOR_SALE, NFTS_LISTED};
use crate::ContractError;
use crate::msg::ReceiveNftsData;

pub fn receive_nfts(deps: DepsMut, info: MessageInfo, msg: Cw721MultiReceiveMsg) -> Result<Response, ContractError> {
    if COLLECTION.load(deps.storage)? != info.sender {
        return Err(ContractError::UnsupportedCollection {});
    }

    let data: ReceiveNftsData = from_json(msg.msg)?;

    if data.prices.len() != msg.token_ids.len() {
        return Err(ContractError::InvalidPricesLength {});
    }

    if data.denoms.len() != msg.token_ids.len() {
        return Err(ContractError::InvalidDenomsLength {});
    }

    let nft_owner = &Addr::unchecked(msg.sender);

    for (i, token_id) in msg.token_ids.iter().enumerate() {
        let ask = Ask { 
            owner: nft_owner.clone(),
            price: Coin {
                denom: data.denoms[i].clone(),
                amount: data.prices[i],
            }
        };
        NFTS_FOR_SALE.save(deps.storage, token_id, &ask)?;
        NFTS_LISTED.save(deps.storage, (nft_owner, token_id), &Empty{})?;
    }

    Ok(Response::default())
}

fn insert_coin(coins: &mut Vec<Coin>, coin: Coin) {
    for c in coins.iter_mut() {
        if c.denom == coin.denom {
            c.amount += coin.amount;
            return;
        }
    }
    coins.push(coin);
}

fn subtract_balance(remaining: &mut [Coin], to_subtract: &Coin) -> Result<(), ContractError> {
    for coin in remaining.iter_mut() {
        if coin.denom == to_subtract.denom {
            coin.amount = coin.amount.checked_sub(to_subtract.amount)
                .map_err(|_| ContractError::InsufficientFunds {})?;
            return Ok(());
        }
    }
    Err(ContractError::MissingDeposit { denom: to_subtract.denom.clone() })
}

pub fn buy_nfts(deps: DepsMut, info: MessageInfo, ids: Vec<String>, allow_partial: bool) -> Result<Response, ContractError> {
    let mut remaining_funds: Vec<Coin> = info.funds.clone();
    let mut withdrawals: BTreeMap<Addr, Vec<Coin>> = BTreeMap::new();
    let mut unavailable: u32 = 0;

    for token_id in ids.iter() {
        let ask = NFTS_FOR_SALE.may_load(deps.storage, token_id)?;
        if ask.is_none() {
            if allow_partial {
                unavailable += 1;
                continue;
            }
            else {
                return Err(ContractError::NftNotForSale { nft_id: token_id.clone() });
            }
        }
        let ask = ask.unwrap(); // safe to unwrap because of check above
        let owner = ask.owner;

        NFTS_FOR_SALE.remove(deps.storage, token_id);
        NFTS_LISTED.remove(deps.storage, (&owner, token_id));

        let mut sale_price = ask.price;
        let commission_rate = COMMISSION_RATE.load(deps.storage)?;
        let commission: Uint128 = sale_price.amount
            .saturating_mul(commission_rate.into())
            .checked_div(COMMISION_PRECISION.into())
            .unwrap();  // Will never divide by zero (com prec is a constant)

        // first decrease available funds for NFT purchases and quit iff insufficient
        subtract_balance(&mut remaining_funds, &sale_price)?;

        // then reduce the sale price by the commission
        sale_price.amount = sale_price.amount.saturating_sub(commission);

        // add the reduced sale price to the owner's withdrawal
        match withdrawals.get_mut(&owner) {
            Some(coins) => insert_coin(coins, sale_price),
            None => { withdrawals.insert(owner, vec![sale_price]); },
        }
    }

    let mut response = Response::new()
        .add_attribute("action", "buy_nfts")
        .add_attribute("sold", (ids.len() as u32 - unavailable).to_string())
        .add_attribute("unavailable", unavailable.to_string());

    // process refund to sender
    response = response.add_message(BankMsg::Send {
        to_address: info.sender.to_string(),
        amount: remaining_funds,
    });

    // Process payment to sellers
    for (owner, coins) in withdrawals.into_iter() {
        let msg = BankMsg::Send {
            to_address: owner.to_string(),
            amount: coins,
        };
        response = response.add_message(msg);
    }

    Ok(response)
}
