use anchor_lang::prelude::*;
use anchor_spl::{
    token::{Token,Mint, TokenAccount, transfer, Transfer},
};

declare_id!("HhUurDHLPLGgQ4YQnbe6xbKxPYNzL4cKwtEicLBnDzbZ");

#[program]
pub mod marketplace {
    use super::*;

    pub fn init_offer(ctx: Context<InitOffer>, price : u64, total_tokens : u64) -> Result<()> {
        let offer : &mut Account<MarketEscrow> = &mut ctx.accounts.offer;
        let signer : &Signer = &ctx.accounts.signer;
        let token_program = &ctx.accounts.token_program;

        transfer(
            CpiContext::new(
                token_program.to_account_info(),
                Transfer{
                    from : ctx.accounts.seller_tokens.to_account_info(),
                    to : ctx.accounts.offer_tokens.to_account_info(),
                    authority : signer.to_account_info(),
                },
            ),
            total_tokens
        )?;

        offer.mint = ctx.accounts.mint.key();
        offer.seller = signer.key();
        offer.price = price;
        offer.total_tokens = total_tokens;

        Ok(())
    }

    pub fn accept_offer(ctx : Context<AcceptOffer>, token_amount : u64, bump : u8) -> Result<()>{
        let offer : &mut Account<MarketEscrow> = &mut ctx.accounts.offer;
//        let signer : &Signer = &ctx.accounts.signer;
        let token_program = &ctx.accounts.token_program;

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.signer.key(),
            &ctx.accounts.seller.key(),
            offer.price * token_amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.signer.to_account_info(),
                ctx.accounts.seller.to_account_info(),
            ],
        ).map_err(|err| println!("{:?}", err)).ok();

        transfer(
            CpiContext::new_with_signer(
                token_program.to_account_info(),
                Transfer{
                    from : ctx.accounts.offer_tokens.to_account_info(),
                    to : ctx.accounts.buyer_tokens.to_account_info(),
                    authority : ctx.accounts.offer_tokens.to_account_info(),
                },
                &[&[
                    &offer.to_account_info().key.clone().to_bytes(),
                    &ctx.accounts.mint.to_account_info().key.clone().to_bytes(),
                    &ctx.accounts.seller.to_account_info().key.clone().to_bytes(),
                    &[bump],
                ]]
            ),
            token_amount
        )?;

        offer.total_tokens = offer.total_tokens - token_amount as u64;

        Ok(())
    }

    pub fn withdraw_offer(ctx : Context<WithdrawOffer>, bump : u8) -> Result<()> {
        let offer : &mut Account<MarketEscrow> = &mut ctx.accounts.offer;
//        let signer : &Signer = &ctx.accounts.signer;
        let token_program = &ctx.accounts.token_program;  

        transfer(
            CpiContext::new_with_signer(
                token_program.to_account_info(),
                Transfer{
                    from : ctx.accounts.offer_tokens.to_account_info(),
                    to : ctx.accounts.seller_tokens.to_account_info(),
                    authority : ctx.accounts.offer_tokens.to_account_info(),
                },
                &[&[
                    &offer.to_account_info().key.clone().to_bytes(),
                    &ctx.accounts.mint.to_account_info().key.clone().to_bytes(),
                    &ctx.accounts.signer.to_account_info().key.clone().to_bytes(),
                    &[bump],
                ]]
            ),
            offer.total_tokens
        )?;
        
        offer.total_tokens = 0;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitOffer<'info> {

    #[account(init,
        payer = signer,
        space = MarketEscrow::LEN,
    )]
    pub offer : Account<'info, MarketEscrow>,

    #[account(mut)]
    pub signer : Signer<'info>,

    #[account(init,
        payer = signer,
        token::mint = mint,
        token::authority = offer_tokens,
        seeds = [
            &offer.to_account_info().key.clone().to_bytes(),
            &mint.to_account_info().key.clone().to_bytes(),
            &signer.to_account_info().key.clone().to_bytes(),
        ],
        bump,
    )]
    pub offer_tokens : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        token::mint = mint,
        token::authority = signer,
    )]
    pub seller_tokens : Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub mint : Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,

    pub rent : Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct AcceptOffer<'info> {

    #[account(mut)]
    pub offer : Account<'info, MarketEscrow>,

    #[account(mut)]
    pub signer : Signer<'info>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(mut,
        address = offer.seller,
    )]
    pub seller : AccountInfo<'info>,

    #[account(mut,
        token::mint = mint,
        token::authority = offer_tokens,
        seeds = [
            &offer.to_account_info().key.clone().to_bytes(),
            &mint.to_account_info().key.clone().to_bytes(),
            &offer.seller.clone().to_bytes(),
        ],
        bump,
    )]
    pub offer_tokens : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        address = offer.mint,
    )]
    pub mint : Account<'info, Mint>,

    #[account(mut,
        token::mint = mint,
        token::authority = signer,
    )]
    pub buyer_tokens : Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,

}

#[derive(Accounts)]
pub struct WithdrawOffer<'info> {

    #[account(mut)]
    pub offer : Account<'info, MarketEscrow>,

    #[account(mut,
        address = offer.seller,
    )]
    pub signer : Signer<'info>,

    #[account(mut,
        token::mint = mint,
        token::authority = offer_tokens,
        seeds = [
            &offer.to_account_info().key.clone().to_bytes(),
            &mint.to_account_info().key.clone().to_bytes(),
            &offer.seller.clone().to_bytes(),
        ],
        bump,
    )]
    pub offer_tokens : Box<Account<'info, TokenAccount>>,

    #[account(mut,
        address = offer.mint,
    )]
    pub mint : Account<'info, Mint>,

    #[account(mut,
        token::mint = mint,
        token::authority = signer,
    )]
    pub seller_tokens : Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,

}

#[account]
pub struct MarketEscrow {
    pub mint : Pubkey,
    pub seller : Pubkey,
    pub price : u64,
    pub total_tokens : u64,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const U64_LENGTH : usize = 8;

impl MarketEscrow {
    pub const LEN : usize = DISCRIMINATOR_LENGTH +
        (PUBLIC_KEY_LENGTH * 2) +
        (U64_LENGTH * 2);
}
