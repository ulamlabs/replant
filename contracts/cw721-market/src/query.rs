use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Deps, Order, Uint128, Uint64};
use crate::error::ContractError;

use crate::state::{ALLOWED_DENOMS, COLLECTION, COMMISSION_RATE, COMMISION_PRECISION, NFTS_FOR_SALE, NFTS_LISTED};


#[cw_serde]
pub struct CommisionRateResponse {
    pub rate: Uint64,
    pub precision: Uint64,
}

#[cw_serde]
pub struct NftForSaleResponse {
    pub nft_id: String,
    pub owner: String,
    pub price: Uint128,
    pub denom: String,
}


pub fn allowed_denoms(deps: Deps) -> Result<Vec<String>, ContractError> {
    Ok(
        ALLOWED_DENOMS.range(deps.storage, None, None, Order::Ascending)
        .filter_map(
            | item | {
                match item {
                    Ok((denom, enabled, )) => if enabled { Some(Ok(denom)) } else { None },
                    Err(e) => Some(Err(e)),
                }
            }
        )
        .collect::<Result<Vec<String>, _>>()?
    )
}

pub fn collection(deps: Deps) -> Result<Addr, ContractError> {
    Ok(COLLECTION.load(deps.storage)?)
}

pub fn commission_rate(deps: Deps) -> Result<CommisionRateResponse, ContractError> {
    let rate = COMMISSION_RATE.load(deps.storage)?;
    Ok(CommisionRateResponse{
        rate: Uint64::from(rate),
        precision: Uint64::from(COMMISION_PRECISION),
    })
}

pub fn all_nfts_for_sale(deps: Deps) -> Result<Vec<NftForSaleResponse>, ContractError> {
    Ok(
        NFTS_FOR_SALE.range(deps.storage, None, None, Order::Ascending).map(
            | item | {
                let (nft_id, ask) = item?;
                Ok(NftForSaleResponse {
                    nft_id,
                    owner: ask.owner.to_string(),
                    price: ask.price.amount,
                    denom: ask.price.denom,
                })
            }
        ).collect::<Result<Vec<NftForSaleResponse>, ContractError>>()?
    )
}

pub fn nfts_for_sale(deps: Deps, account: &String) -> Result<Vec<NftForSaleResponse>, ContractError> {
    let account = &deps.api.addr_validate(account)?;

    let ids: Vec<String> = NFTS_LISTED
        .prefix(account)
        .keys(deps.storage, None, None, Order::Ascending)
        .collect::<Result<Vec<_>, _>>()?;

    ids.into_iter().map(
        | id | {
            let ask = NFTS_FOR_SALE
                .load(deps.storage, &id)?;
            Ok(NftForSaleResponse {
                nft_id: id,
                owner: ask.owner.to_string(),
                price: ask.price.amount,
                denom: ask.price.denom,
            })
        }
    ).collect::<Result<Vec<NftForSaleResponse>, ContractError>>()
}
