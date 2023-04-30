use anchor_lang::prelude::*;

const DISCRIMINATOR_LENGTH: usize = 8;
const USER_LENGTH: usize = 32;
const TWEET_LENGTH: usize = 32;
const PARENT_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const PREFIX_LENGTH: usize = 4;
const COMMENT_CONTENT_LENGTH: usize = 280*4;
const EDITED_STATE_LENGTH: usize = 1;


#[account]
pub struct Comment {
	pub user: Pubkey,
	pub tweet: Pubkey,  // Pubkey of commented tweet
	pub parent: Pubkey, // Pubkey of parent, might be another comment or the commented tweet
	pub timestamp: i64,
	pub content: String,
	pub state: Option<CommentState>,
}


impl Comment {
	const LEN: usize = DISCRIMINATOR_LENGTH + USER_LENGTH + TWEET_LENGTH + PARENT_LENGTH + TIMESTAMP_LENGTH + PREFIX_LENGTH + COMMENT_CONTENT_LENGTH + EDITED_STATE_LENGTH;
}

#[derive(Accounts)]
pub struct SendComment<'info> {
	#[account(init, payer = user, space = Comment::LEN)]
	pub comment: Account<'info, Comment>,
	#[account(mut)]
	pub user: Signer<'info>,
	pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateComment<'info> {
	#[account(mut, has_one = user)]
	pub comment: Account<'info, Comment>,
	pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteComment<'info> {
	#[account(mut, has_one = user)]
	pub comment: Account<'info, Comment>,
	pub user: Signer<'info>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum CommentState {
	Edited,
	Deleted,
}
