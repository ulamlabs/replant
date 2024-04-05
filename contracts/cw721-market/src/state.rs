use cw_storage_plus::{Item, Map};
use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Coin};

/// The asking price for a specified NFT
#[cw_serde]
pub struct Ask {
    pub owner: Addr,
    pub price: Coin,
}


pub const COLLECTION: Item<Addr> = Item::new("col");
pub const ALLOWED_DENOMS: Map<&String, bool> = Map::new("ad");
pub const NFTS_FOR_SALE: Map<&String, Ask> = Map::new("n4s");
