use anchor_lang::prelude::*;
use crate::state::cluster::*;
use anchor_spl::{
    token::{Token,Mint},
};

pub fn create_cluster(ctx : Context<Create>, name : String, symbol : String, t1 : Pubkey, t2 : Pubkey, t3 : Pubkey, amt1 : u64, amt2 : u64, amt3 : u64) -> Result<()>{
    let cluster : &mut Account<Cluster> = &mut ctx.accounts.cluster;
//    let signer : &Signer = &ctx.accounts.signer;
    let cluster_mint : &Account<Mint> = &ctx.accounts.cluster_mint;

    cluster.cluster_name = name;
    cluster.cluster_symbol = symbol;
    cluster.cluster_mint = cluster_mint.key();
    cluster.cluster_supply = 0;
    cluster.token_one = t1;
    cluster.t1amt = amt1 as u64;
    cluster.token_two = t2;
    cluster.t2amt = amt2 as u64;
    cluster.token_three = t3;
    cluster.t3amt = amt3 as u64;
    cluster.inited = false;
    Ok(())
}

#[derive(Accounts)]
#[instruction(bump : u8)]
pub struct Create<'info>{
    #[account(init,
        payer = signer,
        space = Cluster::LEN,
    )]
    pub cluster : Account<'info, Cluster>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(init,
        payer = signer,
        mint::decimals = 0,
        mint::authority = cluster_mint,
        seeds=[&cluster.to_account_info().key.clone().to_bytes()],
        bump,
    )]
    pub cluster_mint : Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}
