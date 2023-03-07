use anchor_lang::error_code;

#[error_code]
pub enum Errors{
    #[msg("The Cluster is yet to be inited")]   
    InitError,

    #[msg("The Cluster is already inited")]
    AlreadyInited,
}