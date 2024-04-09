use cosmwasm_std::{testing::{mock_dependencies, mock_env, mock_info, MockApi, MockQuerier, MockStorage}, Addr, Empty, Env, OwnedDeps};

use cw721_market::{entry as market_methods, ContractError, InstantiateMsg};

pub const DEFAULT_COLLECTION_NAME: &str = "replantation";
pub const DEFAULT_DENOMS: [&str; 2] = ["usei", "usdt-oolamL485"];

pub struct Context {
    pub deps: OwnedDeps<MockStorage, MockApi, MockQuerier, Empty>,
    pub env: Env,
}

impl Default for Context {
    fn default() -> Self {
        Context {
            deps: mock_dependencies(),
            env: mock_env()
        }
    }
}

impl Context {
    pub fn make_address(&self, address: &str) -> Addr {
        self.deps.api.addr_make(address)
    }
}

pub struct MarketContract<'a> {
    pub ctx: &'a mut Context
}

impl MarketContract<'_> {
    pub fn instantiate(sender: Addr, ctx: &mut Context) -> Result<MarketContract, ContractError> {
        let info = mock_info(sender.as_str(), &vec![]);
        let msg = InstantiateMsg {
            owner: sender.to_string(),
            collection: DEFAULT_COLLECTION_NAME.to_string(),
            allowed_denoms: DEFAULT_DENOMS.iter().map(|s| s.to_string()).collect()
        };
        market_methods::instantiate(ctx.deps.as_mut(), ctx.env.clone(), info, msg)?;

        Ok(MarketContract {
            ctx
        })
    }
}

#[test]
fn instantiate_works() {
    let mut ctx = Context::default();
    let admin = ctx.make_address("admin");
    MarketContract::instantiate(admin, &mut ctx).unwrap();
}
