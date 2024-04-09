use cw721_market::state::COMMISION_PRECISION;


#[test]
fn comission_precision_is_nonzero() {
    // Required assumption for unwrap in buy_nfts
    assert!(COMMISION_PRECISION > 0, "Commission precision must be nonzero")
}
