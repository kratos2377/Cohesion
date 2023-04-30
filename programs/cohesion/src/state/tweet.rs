use anchor_lang::prelude::*;


const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const TAG_LENGTH_PREFIX: usize = 4; 
const MAX_TAG_LENGTH: usize = 50 * 4; 
const CONTENT_LENGTH_PREFIX: usize = 4;
const MAX_CONTENT_LENGTH: usize = 280 * 4;

#[account]
pub struct Tweet {
    pub user: Pubkey,
    pub timestamp: i64,
    pub tag: String,
    pub content: String,
    pub state: Option<TweetState>
}

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + TAG_LENGTH_PREFIX + MAX_TAG_LENGTH // Topic.
        + CONTENT_LENGTH_PREFIX + MAX_CONTENT_LENGTH // Content.
        + 1; //state
}


#[derive(Accounts)]
pub struct SendTweet<'info> {
	#[account(init, payer = user, space = Tweet::LEN)]
	pub tweet: Account<'info, Tweet>,
	#[account(mut)]
	pub user: Signer<'info>,
	pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateTweet<'info> {
	#[account(mut, has_one = user)]
	pub tweet: Account<'info, Tweet>,
	pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteTweet<'info> {
	#[account(mut, has_one = user)]
	pub tweet: Account<'info, Tweet>,
	pub user: Signer<'info>,
}


#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum TweetState {
	Edited,
	Deleted,
}