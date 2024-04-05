use cosmwasm_std::{DepsMut, MessageInfo, Response};
use cw_ownable::assert_owner;
use crate::error::ContractError;
use crate::state::ALLOWED_DENOMS;


pub fn allow_denom(deps: DepsMut, info: MessageInfo, denom: String) -> Result<Response, ContractError> {
    assert_owner(deps.storage, &info.sender)?;

    ALLOWED_DENOMS.save(deps.storage, &denom, &true)?;

    Ok(Response::new().add_attribute("allow_denom", denom))
}

pub fn disallow_denom(deps: DepsMut, info: MessageInfo, denom: String) -> Result<Response, ContractError> {
    assert_owner(deps.storage, &info.sender)?;

    ALLOWED_DENOMS.save(deps.storage, &denom, &false)?;

    Ok(Response::new().add_attribute("disallow_denom", denom))
}
