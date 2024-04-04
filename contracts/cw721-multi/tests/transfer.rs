use cosmwasm_std::testing::{mock_dependencies, mock_env};
use cosmwasm_std::{Addr, MessageInfo};
use cw721_multi::multi;
use cw721_multi::types::Cw721Multi;
use cw721_multi::entry::instantiate;

use common::{batch_mint_some, get_instantiate_msg};

mod common;

#[test]
fn multi_transfer_works() {
    let mut con = Cw721Multi::default();

    let mut deps = mock_dependencies();
    let info = MessageInfo {
        sender: Addr::unchecked("user1"),
        funds: vec![],
    };
    let env = mock_env();

    instantiate(deps.as_mut(), env.clone(), info.clone(), get_instantiate_msg()).unwrap();
    batch_mint_some(&mut con, deps.as_mut(), &info, "user1".to_string()).unwrap();

    // let's transfer all tokens to user2
    multi::transfer(
        &mut con,
        deps.as_mut(),
        &env,
        &info,
        String::from("user2"),
        vec!["third".to_string()],
    ).unwrap();
}