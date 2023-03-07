use anchor_lang::prelude::*;
use instructions::*;

pub mod instructions;
pub mod state;
pub mod errors;

declare_id!("CLR2boxd8sn2XnPM5vfEsdhDiUcvCaCuBg3zSzffYMe4");

#[program]
pub mod clusters {
    use super::*;

    pub fn create_cluster(ctx: Context<Create>, name : String, symbol : String, t1 : Pubkey, t2 : Pubkey, t3 : Pubkey, amt1 : u64, amt2 : u64, amt3 : u64) -> Result<()> {
        instructions::create::create_cluster(ctx, name, symbol, t1, t2, t3, amt1, amt2, amt3)?;
        Ok(())
    }

    pub fn init_cluster(ctx : Context<InitCluster>) -> Result<()> {
        instructions::interact::init_cluster(ctx)?;
        Ok(())
    }


    pub fn init_cluster_token_account(ctx : Context<InitTokenAccount>) -> Result<()> {
        instructions::interact::init_cluster_token_account(ctx)?;
        Ok(())
    }

    pub fn issue_cluster(ctx : Context<Issue>, amt : u64, bump : u8) -> Result<()> {
        instructions::interact::issue_cluster(ctx, amt, bump)?;
        Ok(())
    }

    pub fn redeem_cluster(ctx : Context<Redeem>, amt : u64, bump_one : u8, bump_two : u8, bump_three : u8) -> Result<()> {
        instructions::interact::redeem_cluster(ctx, amt, bump_one, bump_two, bump_three)?;
        Ok(())
    }

    pub fn execute_flash(ctx : Context<Execute>, amt : u64, bump_one : u8, bump_two : u8) -> Result<()> {
        instructions::interact::execute_flash(ctx, amt, bump_one, bump_two)?;
        Ok(())
    }

}