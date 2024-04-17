use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Uint128, Uint64};
use cw721_multi::Cw721MultiReceiveMsg;

#[cw_serde]
pub struct InstantiateMsg {
    /// The administrator of the contract
    pub owner: String,
    /// The address of the cw721-multi contract
    pub collection: String,
    /// The list of allowed denoms for selling nfts
    pub allowed_denoms: Vec<String>,
    /// The initial commission rate
    pub commission_rate: Uint64,
}

#[cw_serde]
pub enum ExecuteMsg {
    BuyNfts {
        nft_ids: Vec<String>,
        allow_partial: bool,
    },
    WithdrawNfts {
        nft_ids: Vec<String>,
    },
    // ChangePrices {
    //     nft_ids: Vec<String>,
    //     prices: Vec<u128>,
    //     denoms: Vec<String>,
    // },
    /// Add a new denom to allowed list (admin only)
    AllowDenom {
        denom: String,
    },
    /// Remove a denom from allowed list (admin only)
    /// Removing allowed denom will not purge NFTs that are already for sale
    DisallowDenom {
        denom: String,
    },
    SetCommisionRate {
        rate_per_mil: Uint64,
    },
    ReceiveNfts(Cw721MultiReceiveMsg),
}

#[cw_serde]
pub enum QueryMsg {
    /// Return the list of allowed denoms
    AllowedDenoms {},
    /// Return the address of the collection which can be traded on this market
    Collection {},
    /// Return the commission rate
    CommissionRate {},
    /// All NFTs for sale
    AllNftsForSale {},
    /// Return the list of NFTs for sale by account
    NftsForSale { account: String },
}

#[cw_serde]
pub struct ReceiveNftsData {
    pub prices: Vec<Uint128>,
    pub denoms: Vec<String>,
}
