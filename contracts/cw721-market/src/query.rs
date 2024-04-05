use cosmwasm_std::{Deps, Order};
use crate::error::ContractError;

use crate::state::ALLOWED_DENOMS;

pub fn allowed_denoms(deps: Deps) -> Result<Vec<String>, ContractError> {
    Ok(
        ALLOWED_DENOMS.range(deps.storage, None, None, Order::Ascending)
        .map(|res| res.map(|(k, _)| k))
        .collect::<Result<Vec<String>, _>>()?
    )
}
