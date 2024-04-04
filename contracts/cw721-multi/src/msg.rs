use cosmwasm_schema::{cw_serde, schemars::JsonSchema, serde::{de::DeserializeOwned, Serialize}};
use cosmwasm_std::{to_json_binary, Binary, CosmosMsg, CustomMsg, StdResult, WasmMsg};
use std::fmt::Debug;

#[cw_serde]
pub struct MintMsg<T> {
    /// Unique ID of the NFT
    pub token_id: String,
    /// Universal resource identifier for this NFT
    /// Should point to a JSON file that conforms to the ERC721
    /// Metadata JSON Schema
    pub token_uri: Option<String>,

    pub extension: Option<T>
}

#[cw_serde]
pub enum ExtensionMsg<T> {
    MultiMint {
        owner: String,
        messages: Vec<MintMsg<T>>,
    },
    MultiTransfer {
        recipient: String,
        token_ids: Vec<String>,
    },
    MultiSend {
        contract: String,
        token_ids: Vec<String>,
        msg: String,
    },
}

#[cw_serde]
pub enum ReceiverExecuteMsg {
    ReceiveNfts(Cw721MultiReceiveMsg),
}

#[cw_serde]
pub struct Cw721MultiReceiveMsg {
    pub sender: String,
    pub token_ids: Vec<String>,
    pub msg: String,
}

impl Cw721MultiReceiveMsg {
    pub fn into_binary(self) -> StdResult<Binary> {
        let msg = ReceiverExecuteMsg::ReceiveNfts(self);
        to_json_binary(&msg)
    }

    pub fn into_cosmos_msg(self, contract_addr: String) -> StdResult<CosmosMsg> {
        Ok(
            CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr,
                msg: self.into_binary()?,
                funds: vec![],
            })
        )
    }
}

impl<T: Serialize + DeserializeOwned + Clone + JsonSchema + PartialEq + Debug> CustomMsg for ExtensionMsg<T> {}
