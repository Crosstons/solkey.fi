use anchor_lang::prelude::*;
use anchor_spl::{
    token::{Token, Mint},
};


declare_id!("HyCwgwM8oEscef5NpE7VnMmkTDxu6wsUSog43CKPfmq8");

#[program]
pub mod flash_loan {
    use super::*;

    pub fn on_flash(_ctx: Context<OnFlash>) -> Result<()> {
        Ok(())
    }

    pub fn init(ctx : Context<Init>) -> Result<()> {
        let flash : &mut Account<Flash> = &mut ctx.accounts.flash;
        flash.token_mint = ctx.accounts.mint.to_account_info().key.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct OnFlash<'info>{
    #[account(mut)]
    pub flash_account : Account<'info, Flash>,
}

#[derive(Accounts)]
pub struct Init<'info> {

    #[account(init, payer=signer, space = 8 + 32)]
    pub flash : Account<'info, Flash>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut)]
    pub mint : Account<'info, Mint>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}

#[account]
pub struct Flash {
    pub token_mint : Pubkey,
}