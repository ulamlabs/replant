pub use types::Cw721Multi;
pub use msg::*;

pub mod msg;
pub mod multi;
pub mod types;

// version info for migration info
pub const CONTRACT_NAME: &str = "cw721-multi";
pub const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg(not(feature = "library"))]
pub mod entry {
    use super::*;
    use cosmwasm_std::{
        entry_point, Binary, Deps, DepsMut, Env, MessageInfo, Response,
        StdResult, Empty
    };
    use cw721_base::{
        entry::query as _query,
        ContractError, InstantiateMsg,
    };
    use cw721_base::msg::QueryMsg as Cw721QueryMsg;

    #[entry_point]
    pub fn instantiate(
        deps: DepsMut,
        env: Env,
        info: MessageInfo,
        msg: InstantiateMsg,
    ) -> Result<Response, ContractError> {
        cw2::set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

        let res = Cw721Multi::default().instantiate(deps, env, info, msg)?;

        Ok(res
            .add_attribute("contract_name", CONTRACT_NAME)
            .add_attribute("contract_version", CONTRACT_VERSION))
    }

    #[entry_point]
    pub fn execute(
        deps: DepsMut,
        env: Env,
        info: MessageInfo,
        msg: ExecuteMsg,
    ) -> Result<Response, cw721_base::ContractError> {
        let mut con = Cw721Multi::default();
        match msg {
            ExecuteMsg::Extension { msg } => match msg {
                ExtensionMsg::MultiMint { owner, messages } => {
                    multi::mint(&mut con, deps, &info, owner, messages)
                }
                ExtensionMsg::MultiTransfer { recipient, token_ids } => {
                    multi::transfer(&mut con, deps, &env, &info, recipient, token_ids)
                }
                ExtensionMsg::MultiSend { contract, token_ids, msg } => {
                    multi::send(&mut con, deps, &env, &info, contract, token_ids, msg)
                }
            },
            _ => con.execute(deps, env, info, msg),
        }
    }

    #[entry_point]
    pub fn query(deps: Deps, env: Env, msg: Cw721QueryMsg<Empty>) -> StdResult<Binary> {
        _query(deps, env, msg)
    }
}