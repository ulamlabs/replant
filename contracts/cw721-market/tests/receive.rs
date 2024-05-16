use cosmwasm_std::{from_json, Uint128};
use cw721_market::msg::ReceiveNftsData;



#[test]
fn receive_decodes() {
    let msg = String::from(
        "{\"prices\": [\"1000\", \"2000\"], \"denoms\": [\"uusd\", \"uusd\"]}",
    );

    let data: ReceiveNftsData = from_json(msg).unwrap();

    let exp_prices = vec![Uint128::from(1000u128), Uint128::from(2000u128)];
    let exp_denoms = vec!["uusd".to_string(), "uusd".to_string()];
    
    assert_eq!(data.prices, exp_prices);
    assert_eq!(data.denoms, exp_denoms);
}
