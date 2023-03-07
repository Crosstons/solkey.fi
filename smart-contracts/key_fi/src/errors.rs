use anchor_lang::error_code;

#[error_code]
pub enum Errors{
    #[msg("Max Number of Token Mints for this Vault has been reached!!")]   
    NewMintError,

    #[msg("Incorrect Call due to Token Mints")]   
    VMintsLenError,

    #[msg("The Unlock Time has not arrived yet")]   
    UnlockError,
}