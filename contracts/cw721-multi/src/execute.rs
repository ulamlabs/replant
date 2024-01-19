use cosmwasm_std::{DepsMut, MessageInfo, Response};
use cw721_base::{ContractError, state::TokenInfo};
use crate::{msg::MintMsg, types::{TypeT, Cw721Multi}};
use cw_ownable;


pub fn mint_multi(
    contract: Cw721Multi,
    deps: DepsMut,
    info: MessageInfo,
    owner: String,
    messages: Vec<MintMsg<TypeT>>,
) -> Result<Response, ContractError> {
    cw_ownable::assert_owner(deps.storage, &info.sender)?;

    let mut response = Response::default()
        .add_attribute("action", "mint_multi")
        .add_attribute("minter", info.sender)
        .add_attribute("owner", &owner);

    for msg in messages {

        // create the token
        let token = TokenInfo {
            owner: deps.api.addr_validate(&owner)?,
            approvals: vec![],
            token_uri: msg.token_uri,
            extension: msg.extension,
        };

        contract.tokens
        .update(deps.storage, &msg.token_id, |old| match old {
            Some(_) => Err(ContractError::Claimed {}),
            None => Ok(token),
        })?;

        contract.increment_tokens(deps.storage)?;

        response = response.add_attribute("token_id", msg.token_id);
    }
    Ok(response)

}

pub fn transfer_multi(
    deps: DepsMut,
    info: MessageInfo,
    recipient: String,
    token_ids: Vec<String>,
) -> Result<Response, ContractError> {
    Ok(Response::default())
}