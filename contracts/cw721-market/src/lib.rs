pub mod msg;
pub mod error;
pub mod state;
pub mod admin;
pub mod query;
pub mod trade;

pub use msg::*;
pub use error::ContractError;

// version info for migration info
const CONTRACT_NAME: &str = "cw721-market";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg(not(feature = "library"))]
pub mod entry {
    use super::*;
    use cw_ownable::initialize_owner;
    use cosmwasm_std::{
        entry_point, Binary, Deps, DepsMut, Env, MessageInfo, Response, to_json_binary
    };
    use cosmwasm_schema::serde::Serialize;

    fn encode_query_response<T: Serialize + ?Sized>(data: &T) -> Result<Binary, ContractError> {
        to_json_binary(data).map_err(ContractError::Std)
    }

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
        _env: Env,
        info: MessageInfo,
        msg: ExecuteMsg,
    ) -> Result<Response, ContractError> {
        match msg {
            ExecuteMsg::AllowDenom { denom } => admin::allow_denom(deps, info, denom),
            ExecuteMsg::DisallowDenom { denom } => admin::disallow_denom(deps, info, denom),
            ExecuteMsg::ReceiveNfts( msg ) => trade::receive_nfts(deps, info, msg),
            _ => unimplemented!(),
        }
    }

    #[entry_point]
    pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> Result<Binary, ContractError> {
        match msg {
            QueryMsg::AllowedDenoms {  } => encode_query_response(&query::allowed_denoms(deps)?),
            _ => unimplemented!(),
        }
    }
}
