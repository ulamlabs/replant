use cosmwasm_std::{DepsMut, MessageInfo, Response, Uint64};
use cw_ownable::assert_owner;
use crate::error::ContractError;
use crate::state::{ALLOWED_DENOMS, COMMISSION_RATE, MAX_COMMISSION};


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

pub fn set_commission_rate(deps: DepsMut, info: MessageInfo, rate_per_mil: Uint64) -> Result<Response, ContractError> {
    assert_owner(deps.storage, &info.sender)?;

    // Ensure the commission rate is between 0 and 500000 (50%)
    if rate_per_mil.u64() > MAX_COMMISSION {
        return Err(ContractError::InvalidCommissionRate {});
    }

    // Save the commission rate to the contract's state
    COMMISSION_RATE.save(deps.storage, &rate_per_mil.u64())?;

    Ok(Response::new().add_attribute("set_commission_rate", rate_per_mil.to_string()))
}