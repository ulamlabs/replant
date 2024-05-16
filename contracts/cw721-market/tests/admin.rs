mod contract;

use contract::*;
use cosmwasm_std::Uint64;
use cw721_market::ContractError;
use cw721_market::state::COMMISION_PRECISION;
use test_utils::Context;

#[test]
fn only_admin_endpoints() {
    let mut ctx = Context::default();
    let admin = ctx.make_address("admin");
    let user = ctx.make_address("user");

    let mut contract = MarketContract::instantiate(&admin, &mut ctx).unwrap();

    // user cannot modify denom
    let err = contract.allow_denom(&user, "denom".to_string()).unwrap_err();
    let not_owner = ContractError::Ownership(cw_ownable::OwnershipError::NotOwner {});
    assert_eq!(err, not_owner);

    let err = contract.disallow_denom(&user, "denom".to_string()).unwrap_err();
    assert_eq!(err, not_owner);

    // user cannot modify commission rate
    let err = contract.set_commission_rate(&user, Uint64::from(1234u64)).unwrap_err();
    assert_eq!(err, not_owner);
}


#[test]
fn allow_denom_works() {
    let mut ctx = Context::default();
    let admin = ctx.make_address("admin");

    let mut contract = MarketContract::instantiate(&admin, &mut ctx).unwrap();

    // allow a denom
    contract.allow_denom(&admin, "denom".to_string()).unwrap();

    // ensure it is allowed
    let allowed = contract.query_allowed_denoms().unwrap();
    assert!(allowed.contains(&"denom".to_string()));
}

#[test]
fn disallow_denom_works() {
    let mut ctx = Context::default();
    let admin = ctx.make_address("admin");

    let mut contract = MarketContract::instantiate(&admin, &mut ctx).unwrap();

    // disallow denom
    contract.disallow_denom(&admin, DEFAULT_DENOMS[0].to_string()).unwrap();

    // ensure it is no longer allowed
    let allowed = contract.query_allowed_denoms().unwrap();
    assert!(!allowed.contains(&DEFAULT_DENOMS[0].to_string()));
}

#[test]
fn query_collection_works() {
    let mut ctx = Context::default();
    let admin = ctx.make_address("admin");

    let contract = MarketContract::instantiate(&admin, &mut ctx).unwrap();

    let collection = contract.query_collection().unwrap();
    assert_eq!(collection, ctx.deps.api.addr_make(DEFAULT_COLLECTION_SEED));
}

#[test]
fn commission_rate_works() {
    let mut ctx = Context::default();
    let admin = ctx.make_address("admin");

    let mut contract = MarketContract::instantiate(&admin, &mut ctx).unwrap();

    // ensure default commission rate
    let rate = contract.query_commission_rate().unwrap();
    assert_eq!(rate.precision.u64(), COMMISION_PRECISION);
    assert_eq!(rate.rate.u64(), DEFAULT_COMMISSION_RATE);

    contract.set_commission_rate(&admin, Uint64::from(2137u64)).unwrap();

    // ensure new commission rate
    let rate = contract.query_commission_rate().unwrap();
    assert_eq!(rate.precision.u64(), COMMISION_PRECISION);
    assert_eq!(rate.rate.u64(), 2137);
}
