use cosmwasm_std::StdError;
use cw_ownable::OwnershipError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error(transparent)]
    Std(#[from] StdError),

    #[error(transparent)]
    Ownership(#[from] OwnershipError),

    #[error(transparent)]
    Version(#[from] cw2::VersionError),

    #[error("insufficient funds to purchase NFTs")]
    InsufficientFunds {},

    #[error("missing deposit for curency {denom}")]
    MissingDeposit { denom: String },

    #[error("tried to receive an NFT from an unsupported colleciton")]
    UnsupportedCollection {},

    #[error("denom {denom} is not allowed")]
    DenomNotAllowed { denom: String },

    #[error("length of prices does not match the amount of NFTs offered")]
    InvalidPricesLength {},

    #[error("length of denoms does not match the amount of NFTs offered")]
    InvalidDenomsLength {},

    #[error("NFT {nft_id} is not for sale")]
    NftNotForSale { nft_id: String },

    #[error("Commision rate too high")]
    InvalidCommissionRate {},
}
