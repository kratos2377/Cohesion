use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");


const TEXT_LENGTH: usize = 1024;
const USER_NAME_LENGTH: usize = 100;
const USER_URL_LENGTH: usize = 255;

#[program]
pub mod cohesion {
    use super::*;

    pub fn create_state(
        ctx: Context<CreateState>,
    ) -> ProgramResult {
        let state = &mut ctx.accounts.state;
        state.authority = ctx.accounts.authority.key();
        state.post_count = 0;
        Ok(())
    }
}


#[derive(Accounts)]
pub struct CreateState<'info> {
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8
    )]
    pub state: Account<'info, StateAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: UncheckedAccount<'info>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, StateAccount>,
    #[account(
        init,
        // Post account use string "post" and index of post as seeds
        seeds = [b"post".as_ref(), state.post_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<PostAccount>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH
    )]
    pub post: Account<'info, PostAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: UncheckedAccount<'info>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CreateComment<'info> {
    #[account(mut, seeds = [b"post".as_ref(), post.index.to_be_bytes().as_ref()], bump)]
    pub post: Account<'info, PostAccount>,
    #[account(
        init,
        // Post account use string "comment", index of post and index of comment per post as seeds
        seeds = [b"comment".as_ref(), post.index.to_be_bytes().as_ref(), post.comment_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<CommentAccount>() + TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH
    )]
    pub comment: Account<'info, CommentAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: UncheckedAccount<'info>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
    pub clock: Sysvar<'info, Clock>,
}


#[account]
pub struct StateAccount {
    pub authority: Pubkey,
    pub post_count: u64,
}


#[account]
pub struct PostAccount {
    pub authority: Pubkey,
    pub text: String,
    pub poster_name: String,
    pub poster_url: String,
    pub comment_count: u64,
    pub index: u64,
    pub post_time: i64,
}


#[account]
pub struct CommentAccount {
    pub authority: Pubkey,
    pub text: String,
    pub commenter_name: String,
    pub commenter_url: String,
    pub index: u64,
    pub post_time: i64,
}