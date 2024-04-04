use cosmwasm_schema::cw_serde;
use cosmwasm_std::testing::{mock_dependencies, mock_env};
use cosmwasm_std::{Addr, MessageInfo, from_json};
use cw721_multi::entry::instantiate;
use cw721_multi::multi;
use cw721_multi::types::Cw721Multi;

use common::{batch_mint_some, get_instantiate_msg};

mod common;

#[cw_serde]
enum ExampleExecuteMsg {
    DoSomething {},
    Sleep { time: u64 },
    ReceiveNfts(cw721_multi::Cw721MultiReceiveMsg),
}

#[test]
fn multi_send_works() {
    let mut con = Cw721Multi::default();

    let mut deps = mock_dependencies();
    let info = MessageInfo {
        sender: Addr::unchecked("user1"),
        funds: vec![],
    };
    let env = mock_env();

    instantiate(deps.as_mut(), env.clone(), info.clone(), get_instantiate_msg()).unwrap();
    batch_mint_some(&mut con, deps.as_mut(), &info, "user1".to_string()).unwrap();

    // let's send all tokens to user2
    let res = multi::send(
        &mut con,
        deps.as_mut(),
        &env,
        &info,
        String::from("contract1"),
        vec!["third".to_string(), "second".to_string(), "first".to_string()],
        String::from("enjoy!"),
    ).unwrap();

    let msgs = res.messages;
    assert_eq!(msgs.len(), 1);

    match &msgs[0].msg {
        cosmwasm_std::CosmosMsg::Wasm(cosmwasm_std::WasmMsg::Execute { contract_addr, msg, funds }) => {
            assert_eq!(contract_addr, "contract1");
            assert_eq!(funds, &[]);
            let exec_msg: ExampleExecuteMsg = from_json(msg).unwrap();

            match exec_msg {
                ExampleExecuteMsg::ReceiveNfts(msg) => {
                    assert_eq!(msg.sender, "user1");
                    assert_eq!(msg.token_ids, vec!["third".to_string(), "second".to_string(), "first".to_string()]);
                    assert_eq!(msg.msg, "enjoy!");
                }
                m => panic!("unexpected exec variant: {:?}", m),
            }
        }
        m => panic!("unexpected message: {:?}", m),
    }
}