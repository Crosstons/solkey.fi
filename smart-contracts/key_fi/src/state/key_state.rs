use anchor_lang::prelude::*;
use crate::errors::Errors;

#[account]
pub struct Vault {

    pub nft_mint : Pubkey, // 32
    pub vmints : Vec<Pubkey>, // 4 + (n * 32)
    pub unlock_time : i64, // 8

}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const VEC_LENGTH_PREFIX: usize = 4;
const I64_LENGTH : usize = 8;

impl Vault {
    pub const LEN : usize = DISCRIMINATOR_LENGTH + 
        PUBLIC_KEY_LENGTH + 
        VEC_LENGTH_PREFIX + (PUBLIC_KEY_LENGTH * 3) +
        I64_LENGTH;

    pub fn add_vmint(&mut self, new_mint : Pubkey) -> Result<()> {
        if self.vmints.contains(&new_mint) {
            Ok(())
        }
        else {
            require!(self.vmints.len() < 3, Errors::NewMintError);
            self.vmints.push(new_mint);
            Ok(())
        }
    }
}