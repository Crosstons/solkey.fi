use anchor_lang::prelude::*;
use crate::errors::Errors;


#[account]
pub struct Cluster {
    pub cluster_mint : Pubkey,
    pub cluster_name : String,
    pub cluster_symbol : String,
    pub token_one : Pubkey,
    pub t1amt : u64,
    pub token_two : Pubkey,
    pub t2amt : u64,
    pub token_three : Pubkey,
    pub t3amt : u64,
    pub cluster_supply : u64,
    pub inited : bool,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const MAX_NAME : usize = 21 * 4;
const MAX_SYMBOL : usize = 5 * 4;
const U64_LENGTH : usize = 8;
const BOOL_LENGTH: usize = 1;

impl Cluster{
    pub const LEN : usize = DISCRIMINATOR_LENGTH 
        + (PUBLIC_KEY_LENGTH) * 4  
        + STRING_LENGTH_PREFIX + MAX_NAME
        + STRING_LENGTH_PREFIX + MAX_SYMBOL
        + ( U64_LENGTH ) * 4
        + BOOL_LENGTH;

    pub fn cluster_supply(&self) -> u64 {
        return  self.cluster_supply;
    }


    pub fn init_cluster(&mut self) -> Result<()>{
        require!(self.inited == false, Errors::AlreadyInited);
        self.inited = true;
        Ok(())
    }

    pub fn issue_cluster(&mut self, amt : u64) -> Result<()>{
        require!(self.inited, Errors::InitError);
        self.cluster_supply += amt;
        Ok(())
    }

    pub fn redeem_cluster(&mut self, amt : u64) -> Result<()>{
        require!(self.inited, Errors::InitError);
        self.cluster_supply -= amt;
        Ok(())
    }
}