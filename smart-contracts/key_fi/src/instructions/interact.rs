use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount, transfer, Transfer, burn, Burn};
use crate::state::key_state::*;
use crate::errors::Errors;

pub fn create_vault(ctx : Context<CreateVault>, unlock_time : i64) -> Result<()> {
    let vault : &mut Account<Vault> = &mut ctx.accounts.vault;
    let nft_mint : &Account<Mint> = &ctx.accounts.nft_mint;

    let vmints : Vec<Pubkey> = Vec::new();
 
    vault.nft_mint = nft_mint.key();
    vault.unlock_time = unlock_time;
    vault.vmints = vmints;

    Ok(())
}

pub fn insure_nft(ctx : Context<Insure>, amount : u64) -> Result<()> {
    let vault : &mut Account<Vault> = &mut ctx.accounts.vault;
    let vmint : &Account<Mint> = &ctx.accounts.vmint;
    let token_program = &ctx.accounts.token_program;
    let signer : &Signer = &ctx.accounts.signer;

    transfer(
        CpiContext::new(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.insure_tokens.to_account_info(),
                to : ctx.accounts.vault_tokens.to_account_info(),
                authority : signer.to_account_info(),
            },
        ),
        amount
    )?;

    vault.add_vmint(vmint.key())?;

    Ok(())
}

pub fn claim_vault1(ctx : Context<ClaimVaultOne>, bump : u8) -> Result<()> {
    let vault : &mut Account<Vault> = &mut ctx.accounts.vault;
    let nft_mint : &Account<Mint> = &ctx.accounts.nft_mint;
    let token_program = &ctx.accounts.token_program;
    let now_ts = Clock::get().unwrap().unix_timestamp;

    require!(vault.unlock_time - now_ts < 0, Errors::UnlockError);

    require!(vault.vmints.len() == 1, Errors::VMintsLenError);

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.vault_tokens1.to_account_info(),
                to : ctx.accounts.claim_tokens1.to_account_info(),
                authority : vault.to_account_info(),
            },
            &[&[
                &nft_mint.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        ctx.accounts.vault_tokens1.amount
    )?;

    burn(
        CpiContext::new(
            token_program.to_account_info(),
            Burn{
                mint : nft_mint.to_account_info(),
                from : ctx.accounts.nft_account.to_account_info(),
                authority : ctx.accounts.signer.to_account_info(),
            },
        ), 
        nft_mint.supply
    )?;

    Ok(())
}

pub fn claim_vault2(ctx : Context<ClaimVaultTwo>, bump : u8) -> Result<()> {
    let vault : &mut Account<Vault> = &mut ctx.accounts.vault;
    let nft_mint : &Account<Mint> = &ctx.accounts.nft_mint;
    let token_program = &ctx.accounts.token_program;
    let now_ts = Clock::get().unwrap().unix_timestamp;

    require!(vault.unlock_time - now_ts < 0, Errors::UnlockError);
    require!(vault.vmints.len() == 2, Errors::VMintsLenError);

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.vault_tokens1.to_account_info(),
                to : ctx.accounts.claim_tokens1.to_account_info(),
                authority : vault.to_account_info(),
            },
            &[&[
                &nft_mint.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        ctx.accounts.vault_tokens1.amount
    )?;

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.vault_tokens2.to_account_info(),
                to : ctx.accounts.claim_tokens2.to_account_info(),
                authority : vault.to_account_info(),
            },
            &[&[
                &nft_mint.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        ctx.accounts.vault_tokens2.amount
    )?;

    burn(
        CpiContext::new(
            token_program.to_account_info(),
            Burn{
                mint : nft_mint.to_account_info(),
                from : ctx.accounts.nft_account.to_account_info(),
                authority : ctx.accounts.signer.to_account_info(),
            },
        ), 
        nft_mint.supply
    )?;

    Ok(())
}

pub fn claim_vault3(ctx : Context<ClaimVaultThree>, bump : u8) -> Result<()> {
    let vault : &mut Account<Vault> = &mut ctx.accounts.vault;
    let nft_mint : &Account<Mint> = &ctx.accounts.nft_mint;
    let token_program = &ctx.accounts.token_program;
    let now_ts = Clock::get().unwrap().unix_timestamp;

    require!(vault.unlock_time - now_ts < 0, Errors::UnlockError);
    require!(vault.vmints.len() == 3, Errors::VMintsLenError);

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.vault_tokens1.to_account_info(),
                to : ctx.accounts.claim_tokens1.to_account_info(),
                authority : vault.to_account_info(),
            },
            &[&[
                &nft_mint.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        ctx.accounts.vault_tokens1.amount
    )?;

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.vault_tokens2.to_account_info(),
                to : ctx.accounts.claim_tokens2.to_account_info(),
                authority : vault.to_account_info(),
            },
            &[&[
                &nft_mint.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        ctx.accounts.vault_tokens2.amount
    )?;

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.vault_tokens3.to_account_info(),
                to : ctx.accounts.claim_tokens3.to_account_info(),
                authority : vault.to_account_info(),
            },
            &[&[
                &nft_mint.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        ctx.accounts.vault_tokens3.amount
    )?;

    burn(
        CpiContext::new(
            token_program.to_account_info(),
            Burn{
                mint : nft_mint.to_account_info(),
                from : ctx.accounts.nft_account.to_account_info(),
                authority : ctx.accounts.signer.to_account_info(),
            },
        ), 
        nft_mint.supply
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct CreateVault<'info> {

    #[account(init,
        payer = signer,
        space = Vault::LEN,
        seeds = [&nft_mint.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub vault : Account<'info, Vault>,

    #[account(mut)]
    pub signer : Signer<'info>,

    pub nft_mint : Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Insure<'info> {

    #[account(mut,
        seeds = [&nft_mint.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub vault : Account<'info, Vault>,

    #[account(mut)]
    pub signer : Signer<'info>,

    pub nft_mint : Account<'info, Mint>,

    #[account(mut)]
    pub vmint : Account<'info, Mint>,

    #[account(mut,
        token::mint = vmint,
        token::authority = vault,
    )]
    pub vault_tokens : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vmint,
        token::authority = signer,
    )]
    pub insure_tokens : Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,

}

#[derive(Accounts)]
pub struct ClaimVaultOne<'info> {

    #[account(mut,
        seeds = [&nft_mint.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub vault : Account<'info, Vault>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut)]
    pub nft_mint : Account<'info, Mint>,

    #[account(mut,
        token::mint = nft_mint,
        token::authority = signer,
    )]
    pub nft_account : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[0],
        token::authority = vault,
    )]
    pub vault_tokens1 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[0],
        token::authority = signer,
    )]
    pub claim_tokens1 : Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimVaultTwo<'info> {

    #[account(mut,
        seeds = [&nft_mint.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub vault : Account<'info, Vault>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut)]
    pub nft_mint : Account<'info, Mint>,

    #[account(mut,
        token::mint = nft_mint,
        token::authority = signer,
    )]
    pub nft_account : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[0],
        token::authority = vault,
    )]
    pub vault_tokens1 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[1],
        token::authority = vault,
    )]
    pub vault_tokens2 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[0],
        token::authority = signer,
    )]
    pub claim_tokens1 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[1],
        token::authority = signer,
    )]
    pub claim_tokens2 : Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimVaultThree<'info> {

    #[account(mut,
        seeds = [&nft_mint.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub vault : Account<'info, Vault>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut)]
    pub nft_mint : Account<'info, Mint>,

    #[account(mut,
        token::mint = nft_mint,
        token::authority = signer,
    )]
    pub nft_account : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[0],
        token::authority = vault,
    )]
    pub vault_tokens1 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[1],
        token::authority = vault,
    )]
    pub vault_tokens2 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[2],
        token::authority = vault,
    )]
    pub vault_tokens3 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[0],
        token::authority = signer,
    )]
    pub claim_tokens1 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[1],
        token::authority = signer,
    )]
    pub claim_tokens2 : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = vault.vmints[2],
        token::authority = signer,
    )]
    pub claim_tokens3 : Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}