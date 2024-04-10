use cosmwasm_std::testing::{mock_dependencies, mock_env, MockApi, MockQuerier, MockStorage};
use cosmwasm_std::{Env, Addr, Empty, OwnedDeps};

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
