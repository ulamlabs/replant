mod msg;
mod error;
mod state;

use cw_ownable::initialize_owner;
pub use msg::*;
pub use error::ContractError;



// version info for migration info
const CONTRACT_NAME: &str = "cw721-market";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");


#[cfg(not(feature = "library"))]
pub mod entry {
    use super::*;
    use cosmwasm_std::{
        entry_point, to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult
    };

    #[entry_point]
    pub fn instantiate(
        deps: DepsMut,
        _env: Env,
        _info: MessageInfo,
        msg: InstantiateMsg,
    ) -> Result<Response, ContractError> {
        cw2::set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

        initialize_owner(deps.storage, deps.api, Some(&msg.owner))?;
        // Store allowed denominations to the contract's state
        for denom in msg.allowed_denoms {
            state::ALLOWED_DENOMS.save(deps.storage, &denom, &true)?;
        }
        // Save the NFT collection's address
        state::COLLECTION.save(deps.storage, &deps.api.addr_validate(&msg.collection)?)?;

        let res = Response::new()
            .add_attribute("contract_name", CONTRACT_NAME)
            .add_attribute("contract_version", CONTRACT_VERSION);

        Ok(res)
    }

    #[entry_point]
    pub fn execute(
        deps: DepsMut,
        env: Env,
        info: MessageInfo,
        msg: ExecuteMsg,
    ) -> Result<Response, ContractError> {
        unimplemented!();
    }

    #[entry_point]
    pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> Result<Binary, ContractError> {
        unimplemented!();
    }
}