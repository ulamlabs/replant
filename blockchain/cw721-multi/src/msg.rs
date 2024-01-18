use cosmwasm_schema::cw_serde;
use cosmwasm_std::CustomMsg;

#[cw_serde]
pub enum ExtensionMsg {
    MintMulti {}
}

impl CustomMsg for ExtensionMsg {}
