use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Deps, Order, Uint64};
use crate::error::ContractError;

use crate::state::{ALLOWED_DENOMS, COLLECTION, COMMISSION_RATE, COMMISION_PRECISION};


#[cw_serde]
pub struct CommisionRateResponse {
    pub rate: Uint64,
    pub precision: Uint64,
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
