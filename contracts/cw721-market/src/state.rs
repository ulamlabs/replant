use cw_storage_plus::{Item, Map};
use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Coin, Empty};

/// The asking price for a specified NFT
#[cw_serde]
pub struct Ask {
    pub owner: Addr,
    pub price: Coin,
}

pub const COMMISION_PRECISION: u64 = 1_000_000;
pub const MAX_COMMISSION: u64 = 500_000;

pub const COMMISSION_RATE: Item<u64> = Item::new("cr");
pub const COLLECTION: Item<Addr> = Item::new("col");
pub const ALLOWED_DENOMS: Map<&String, bool> = Map::new("ad");
pub const NFTS_FOR_SALE: Map<&String, Ask> = Map::new("n4s");
pub const NFTS_LISTED: Map<(&Addr, &String), Empty> = Map::new("nl");
