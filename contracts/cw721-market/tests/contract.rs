use cosmwasm_std::Uint64;
use cosmwasm_std::{testing::mock_info, Addr};

use cw721_market::{entry as market_methods, ContractError, InstantiateMsg};
use cw721_market as market;

use test_utils::Context;

pub const DEFAULT_COLLECTION_SEED: &str = "replantation";
pub const DEFAULT_DENOMS: [&str; 2] = ["usei", "usdt-oolamL485"];
pub const DEFAULT_COMMISSION_RATE: u64 = 100_000; // 10%

pub struct MarketContract<'a> {
    pub ctx: &'a mut Context
}

impl<'a> MarketContract<'a> {
    /// sender is also the default admin
    pub fn instantiate(sender: &Addr, ctx: &'a mut Context) -> Result<MarketContract<'a>, ContractError> {
        let info = mock_info(sender.as_str(), &vec![]);
        let msg = InstantiateMsg {
            owner: sender.to_string(),
            collection: ctx.deps.api.addr_make(DEFAULT_COLLECTION_SEED).to_string(),
            allowed_denoms: DEFAULT_DENOMS.iter().map(|s| s.to_string()).collect(),
            commission_rate: Uint64::from(DEFAULT_COMMISSION_RATE),
        };
        market_methods::instantiate(ctx.deps.as_mut(), ctx.env.clone(), info, msg)?;

        Ok(MarketContract {
            ctx
        })
    }

    pub fn allow_denom(&mut self, sender: &Addr, denom: String) -> Result<(), ContractError> {
        market::admin::allow_denom(
            self.ctx.deps.as_mut(),
            mock_info(sender.as_str(), &vec![]),
            denom
        )?;
        Ok(())
    }

    pub fn disallow_denom(&mut self, sender: &Addr, denom: String) -> Result<(), ContractError> {
        market::admin::disallow_denom(
            self.ctx.deps.as_mut(),
            mock_info(sender.as_str(), &vec![]),
            denom
        )?;
        Ok(())
    }

    pub fn set_commission_rate(&mut self, sender: &Addr, rate_per_mil: Uint64) -> Result<(), ContractError> {
        market::admin::set_commission_rate(
            self.ctx.deps.as_mut(),
            mock_info(sender.as_str(), &vec![]),
            rate_per_mil
        )?;
        Ok(())
    }

    pub fn query_allowed_denoms(&self) -> Result<Vec<String>, ContractError> {
        market::query::allowed_denoms(self.ctx.deps.as_ref())
    }

    pub fn query_collection(&self) -> Result<Addr, ContractError> {
        market::query::collection(self.ctx.deps.as_ref())
    }

    pub fn query_commission_rate(&self) -> Result<market::query::CommisionRateResponse, ContractError> {
        market::query::commission_rate(self.ctx.deps.as_ref())
    }
}
