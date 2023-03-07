use anchor_lang::prelude::*;
use instructions::*;

pub mod state;
pub mod instructions;
pub mod errors;

declare_id!("DfBT3PCjJEJXu8FYwFKvHktxQAL7LRQTnLsyuCTRidYn");

#[program]
pub mod key_fi {
    use super::*;

    pub fn create_vault(ctx: Context<CreateVault>, unlock_time : i64) -> Result<()> {
        instructions::interact::create_vault(ctx, unlock_time)?;
        Ok(())
    }

    pub fn insure_nft(ctx : Context<Insure>, amount : u64) -> Result<()> {
        instructions::interact::insure_nft(ctx, amount)?;
        Ok(())
    }

    pub fn claim_vault1(ctx : Context<ClaimVaultOne>, bump : u8) -> Result<()> {
        instructions::interact::claim_vault1(ctx, bump)?;
        Ok(())
    }

    pub fn claim_vault2(ctx : Context<ClaimVaultTwo>, bump : u8) -> Result<()> {
        instructions::interact::claim_vault2(ctx, bump)?;
        Ok(())
    }

    pub fn claim_vault3(ctx : Context<ClaimVaultThree>, bump : u8) -> Result<()> {
        instructions::interact::claim_vault3(ctx, bump)?;
        Ok(())
    }
}
