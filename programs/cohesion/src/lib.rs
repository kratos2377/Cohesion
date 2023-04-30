use anchor_lang::prelude::*;
use state::*;

pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");


const TEXT_LENGTH: usize = 1024;
const USER_NAME_LENGTH: usize = 100;
const USER_URL_LENGTH: usize = 255;

#[program]
pub mod cohesion {
    use super::*;

    // Tweet Instructions
    pub fn send_tweet(ctx: Context<SendTweet>, tag: String, content: String) -> Result<()> {
		instructions::send_tweet(ctx, tag, content)
	}

	pub fn update_tweet(ctx: Context<UpdateTweet>, new_tag: String, new_content: String) -> Result<()> {
		instructions::update_tweet(ctx, new_tag, new_content)
	}

	pub fn delete_tweet(ctx: Context<DeleteTweet>) -> Result<()> {
		instructions::delete_tweet(ctx)
	}
}

