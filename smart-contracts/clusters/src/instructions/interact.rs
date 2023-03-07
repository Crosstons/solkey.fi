use anchor_lang::prelude::*;
use crate::state::cluster::*;
use flash_loan::cpi::accounts::OnFlash;
use flash_loan::program::FlashLoan;
use flash_loan::{self,Flash};
use anchor_spl::{
    token::{TokenAccount, Token, Mint, Transfer, transfer, mint_to, MintTo, burn, Burn},
};

pub fn init_cluster(ctx : Context<InitCluster>) -> Result<()> {
    let cluster : &mut Account<Cluster> = &mut ctx.accounts.cluster;
    cluster.init_cluster()?;
    Ok(())
}

pub fn init_cluster_token_account(_ctx : Context<InitTokenAccount>) -> Result<()>{
    Ok(())
}

pub fn issue_cluster(ctx : Context<Issue>, amt : u64, bump : u8) -> Result<()>{
    let cluster : &mut Account<Cluster> = &mut ctx.accounts.cluster;
    let signer : &Signer = &ctx.accounts.signer;
    let token_program = &ctx.accounts.token_program;
    let cluster_mint : &mut Account<Mint> = &mut ctx.accounts.cluster_token;
    let cluster_token_account : &mut Account<TokenAccount> = &mut ctx.accounts.cluster_token_account;

    transfer(
        CpiContext::new(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.issuer_one.to_account_info(),
                to : ctx.accounts.cluster_one.to_account_info(),
                authority : signer.to_account_info(),
            },
        ),
        cluster.t1amt * amt
    )?;


    transfer(
        CpiContext::new(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.issuer_two.to_account_info(),
                to : ctx.accounts.cluster_two.to_account_info(),
                authority : signer.to_account_info(),
            },
        ),
        cluster.t2amt * amt
    )?;

    transfer(
        CpiContext::new(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.issuer_three.to_account_info(),
                to : ctx.accounts.cluster_three.to_account_info(),
                authority : signer.to_account_info(),
            },
        ),
        cluster.t3amt * amt
    )?;

     mint_to(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            MintTo{ 
                mint: cluster_mint.to_account_info(), 
                to: cluster_token_account.to_account_info(), 
                authority: cluster_mint.to_account_info(), 
            },
            &[&[
                &cluster.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        amt
    )?;  

    cluster.issue_cluster(amt)?;
    Ok(())
}

pub fn redeem_cluster(ctx : Context<Redeem>, amt : u64, bump_one : u8, bump_two : u8, bump_three : u8) -> Result<()>{
    let cluster : &mut Account<Cluster> = &mut ctx.accounts.cluster;
    let signer : &Signer = &ctx.accounts.signer;
    let token_program = &ctx.accounts.token_program;
    let cluster_mint : &mut Account<Mint> = &mut ctx.accounts.cluster_token;
    let mint_one : &mut Account<Mint> = &mut ctx.accounts.mint_one;
    let mint_two : &mut Account<Mint> = &mut ctx.accounts.mint_two;
    let mint_three : &mut Account<Mint> = &mut ctx.accounts.mint_three;
    let cluster_token_account : &mut Account<TokenAccount> = &mut ctx.accounts.cluster_token_account;
    let cluster_one : &mut Account<TokenAccount> = &mut ctx.accounts.cluster_one;
    let redeemer_one : &mut Account<TokenAccount> = &mut ctx.accounts.redeemer_one;

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : cluster_one.to_account_info(),
                to : redeemer_one.to_account_info(),
                authority : cluster_one.to_account_info(),
            },
            &[&[
                &mint_one.to_account_info().key.clone().to_bytes(),
                &cluster.to_account_info().key.clone().to_bytes(),
                &[bump_one],
            ]]
        ),
        cluster.t1amt * amt
    )?;


    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.cluster_two.to_account_info(),
                to : ctx.accounts.redeemer_two.to_account_info(),
                authority : ctx.accounts.cluster_two.to_account_info(),
            },
            &[&[
                &mint_two.to_account_info().key.clone().to_bytes(),
                &cluster.to_account_info().key.clone().to_bytes(),
                &[bump_two],
            ]]
        ),
        cluster.t2amt * amt
    )?;

    transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.cluster_three.to_account_info(),
                to : ctx.accounts.redeemer_three.to_account_info(),
                authority : ctx.accounts.cluster_three.to_account_info(),
            },
            &[&[
                &mint_three.to_account_info().key.clone().to_bytes(),
                &cluster.to_account_info().key.clone().to_bytes(),
                &[bump_three],
            ]]
        ),
        cluster.t3amt * amt
    )?;

    burn(
        CpiContext::new(
            token_program.to_account_info(),
            Burn{
                mint : cluster_mint.to_account_info(),
                from : cluster_token_account.to_account_info(),
                authority : signer.to_account_info(),
            },
        ), 
        amt
    )?;

/*      mint_to(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            MintTo{ 
                mint: cluster_mint.to_account_info(), 
                to: cluster_token_account.to_account_info(), 
                authority: cluster_mint.to_account_info(), 
            },
            &[&[
                &cluster.to_account_info().key.clone().to_bytes(),
                &[bump],
            ]]
        ),
        amt
    )?;  
*/
    cluster.redeem_cluster(amt)?;
    Ok(())
}

pub fn execute_flash(ctx : Context<Execute>, amt : u64, bump_one : u8, bump_two : u8) -> Result<()>{

    transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.cluster_token_account.to_account_info(),
                to : ctx.accounts.flash_token_account.to_account_info(),
                authority : ctx.accounts.cluster_token_account.to_account_info(),
            },
            &[&[
                &ctx.accounts.mint.to_account_info().key.clone().to_bytes(),
                &ctx.accounts.cluster.to_account_info().key.clone().to_bytes(),
                &[bump_one],
            ]]
        ),
        amt
    )?;

    let cpi_program = ctx.accounts.flash_program.to_account_info();
    let cpi_accounts = OnFlash {
        flash_account : ctx.accounts.flash.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    flash_loan::cpi::on_flash(cpi_ctx)?;

    transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer{
                from : ctx.accounts.flash_token_account.to_account_info(),
                to : ctx.accounts.cluster_token_account.to_account_info(),
                authority : ctx.accounts.flash_token_account.to_account_info(),
            },
            &[&[
                &ctx.accounts.mint.to_account_info().key.clone().to_bytes(),
                &ctx.accounts.flash.to_account_info().key.clone().to_bytes(),
                &[bump_two],
            ]]
        ),
        amt
    )?;

    Ok(())
}

#[derive(Accounts)]
pub struct Execute<'info>{

    #[account(mut)]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub mint : Account<'info, Mint>,

    #[account(mut)]
    pub flash : Account<'info, Flash>,
    
    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(
        mut,
        token::mint = mint,
        token::authority = cluster_token_account,
        seeds = [&mint.to_account_info().key.clone().to_bytes(), &cluster.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub cluster_token_account : Box<Account<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = signer,
        token::mint = mint,
        token::authority = flash_token_account,
        seeds = [&mint.to_account_info().key.clone().to_bytes(), &flash.to_account_info().key.clone().to_bytes()], 
        bump)]
    pub flash_token_account : Box<Account<'info, TokenAccount>>,

    pub flash_program : Program<'info, FlashLoan>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitCluster<'info>{

    #[account(mut)]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(
        mut, 
        address = cluster.token_one.key()
    )]
    pub mint_one : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_two.key()
    )]
    pub mint_two : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_three.key()
    )]
    pub mint_three : Account<'info, Mint>,

    #[account(
        init,
        payer = signer,
        token::mint = mint_one,
        token::authority = mint_one_account,
        seeds = [
            &mint_one.to_account_info().key.clone().to_bytes(),
            &cluster.to_account_info().key.clone().to_bytes()
        ],
        bump,
    )]
    pub mint_one_account : Box<Account<'info, TokenAccount>>, 

    #[account(
        init,
        payer = signer,
        token::mint = mint_two,
        token::authority = mint_two_account,
        seeds = [&mint_two.to_account_info().key.clone().to_bytes(),
                &cluster.to_account_info().key.clone().to_bytes()
        ],
        bump,
    )]
    pub mint_two_account : Box<Account<'info, TokenAccount>>, 

    #[account(
        init,
        payer = signer,
        token::mint = mint_three,
        token::authority = mint_three_account,
        seeds = [&mint_three.to_account_info().key.clone().to_bytes(),
                &cluster.to_account_info().key.clone().to_bytes()
        ],
        bump,
    )]
    pub mint_three_account : Box<Account<'info, TokenAccount>>, 

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,

    pub rent : Sysvar<'info, Rent>,

}

#[derive(Accounts)]
pub struct InitTokenAccount<'info>{

    #[account()]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(mut,
        address = cluster.cluster_mint,
    )]
    pub cluster_token : Account<'info, Mint>,

    #[account(
        init,  
        payer = signer,
        token::mint = cluster_token,
        token::authority = signer,
    )]
    pub cluster_token_account : Account<'info, TokenAccount>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}

#[derive(Accounts)]
pub struct Issue<'info> {
    #[account(mut)]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(
        mut,
        token::mint = mint_one,
        token::authority = signer,
    )]
    pub issuer_one : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_two,
        token::authority = signer,
    )]
    pub issuer_two : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_three,
        token::authority = signer,
    )]
    pub issuer_three : Box<Account<'info, TokenAccount>>,

    #[account(
        mut, 
        address = cluster.token_one,
    )]
    pub mint_one : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_two,
    )]
    pub mint_two : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_three,
    )]
    pub mint_three : Account<'info, Mint>,

    #[account(
        mut,
        token::mint = mint_one,
        token::authority = cluster_one,
    )]
    pub cluster_one : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_two,
        token::authority = cluster_two,
    )]
    pub cluster_two : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_three,
        token::authority = cluster_three,
    )]
    pub cluster_three : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds=[&cluster.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub cluster_token : Account<'info, Mint>,

    #[account(mut,
        token::mint = cluster_token,
        token::authority = signer,
    )]
    pub cluster_token_account : Box<Account<'info, TokenAccount>>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}

#[derive(Accounts)]
pub struct Redeem<'info>{
    #[account(mut)]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(
        mut, 
        address = cluster.token_one,
    )]
    pub mint_one : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_two,
    )]
    pub mint_two : Account<'info, Mint>,

    #[account(
        mut, 
        address = cluster.token_three,
    )]
    pub mint_three : Account<'info, Mint>,

    #[account(
        mut,
        token::mint = mint_one,
        token::authority = cluster_one,
        seeds = [&mint_one.to_account_info().key.clone().to_bytes(), &cluster.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub cluster_one : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_two,
        token::authority = cluster_two,
        seeds = [&mint_two.to_account_info().key.clone().to_bytes(), &cluster.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub cluster_two : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_three,
        token::authority = cluster_three,
        seeds = [&mint_three.to_account_info().key.clone().to_bytes(), &cluster.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub cluster_three : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_one,
        token::authority = signer,
    )]
    pub redeemer_one : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_two,
        token::authority = signer,
    )]
    pub redeemer_two : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        token::mint = mint_three,
        token::authority = signer,
    )]
    pub redeemer_three : Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds=[&cluster.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub cluster_token : Account<'info, Mint>,

    #[account(mut,
        token::mint = cluster_token,
        token::authority = signer,
    )]
    pub cluster_token_account : Box<Account<'info, TokenAccount>>,

    pub token_program : Program<'info, Token>,

    pub system_program : Program<'info, System>,
}
