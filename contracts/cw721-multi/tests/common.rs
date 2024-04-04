use cosmwasm_std::{DepsMut, MessageInfo, Response};
use cw721_base::InstantiateMsg;
use cw721_multi::msg::MintMsg;
use cw721_multi::multi;
use cw721_multi::types::Cw721Multi;

pub fn batch_mint_some(con: &mut Cw721Multi, deps: DepsMut, info: &MessageInfo, owner: String) -> Result<Response, cw721_base::ContractError> {
    multi::mint(
        con,
        deps,
        info,
        owner,
        vec![
            MintMsg {
                token_id: "first".to_string(),
                token_uri: None,
                extension: None,
            },
            MintMsg {
                token_id: "second".to_string(),
                token_uri: None,
                extension: None,
            },
            MintMsg {
                token_id: "third".to_string(),
                token_uri: None,
                extension: None,
            },
        ]
    )
}

pub fn get_instantiate_msg() -> InstantiateMsg {
    InstantiateMsg {
        name: "token".to_string(),
        symbol: "TKN".to_string(),
        minter: "user1".to_string(),
    }
}