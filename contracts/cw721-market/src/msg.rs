use cosmwasm_schema::cw_serde;
use cw721_multi::Cw721MultiReceiveMsg;

#[cw_serde]
pub struct InstantiateMsg {
    /// The administrator of the contract
    pub owner: String,
    /// The address of the cw721-multi contract
    pub collection: String,
    /// The list of allowed denoms for selling nfts
    pub allowed_denoms: Vec<String>,
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
    ChangePrices {
        nft_ids: Vec<String>,
        prices: Vec<u128>,
        denom: String,
    },
    /// Add a new denom to allowed list (admin only)
    AllowDenom {
        denom: String,
    },
    /// Remove a denom from allowed list (admin only)
    /// Removing allowed denom will not purge NFTs that are already for sale
    BlockDenom {
        denom: String,
    },
    ReceiveNfts(Cw721MultiReceiveMsg),
}

#[cw_serde]
pub enum QueryMsg {
    /// Return the list of allowed denoms
    AllowedDenoms {},
    /// Return the list of NFTs for sale (optional account filter)
    NftsForSale { account: Option<String> },
    /// Return the price of the NFT
    NftPrices { nft_id: Vec<String> },
    /// Return the owner of the NFT
    NftOwner { nft_id: String },
}