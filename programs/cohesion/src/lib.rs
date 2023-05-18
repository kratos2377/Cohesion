use anchor_lang::prelude::*;
use state::*;

pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("8D1NPspyZ1fGY2FvuiBTXFCBLo3SKJY9QTdoyLqPbsTQ");


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

	// Voting Instructions
	pub fn vote(ctx: Context<Vote>, tweet: Pubkey, result: VotingResult, voting_bump: u8) -> Result<()> {
		instructions::vote(ctx, tweet, result, voting_bump)
	}

	pub fn update_voting(ctx: Context<UpdateVoting>, new_result: VotingResult) -> Result<()> {
		instructions::update_voting(ctx, new_result)
	}
    
	// Reaction Instructions
	pub fn react(ctx: Context<React>, tweet: Pubkey, reaction_char: String, reaction_bump: u8) -> Result<()> {
		instructions::react(ctx, tweet, reaction_char, reaction_bump)
	}

	pub fn update_reaction(ctx: Context<UpdateReaction>, new_reaction_char: String) -> Result<()> {
		instructions::update_reaction(ctx, new_reaction_char)
	}

	pub fn delete_reaction(_ctx: Context<DeleteReaction>) -> Result<()> {
		instructions::delete_reaction(_ctx)
	}

	// Comments Instructions
	pub fn send_comment(ctx: Context<SendComment>, tweet: Pubkey, content: String, parent: Option<Pubkey>) -> Result<()> {
		instructions::send_comment(ctx, tweet, content, parent)
	}
	
	pub fn update_comment(ctx: Context<UpdateComment>, new_content: String) -> Result<()> {
		instructions::update_comment(ctx, new_content)
	}
	
	pub fn delete_comment(ctx: Context<DeleteComment>) -> Result<()> {
		instructions::delete_comment(ctx)
	}
	
	// DM Instrcutions
	pub fn send_dm(ctx: Context<SendDm>, recipient: Pubkey, content: String) -> Result<()> {
		instructions::send_dm(ctx, recipient, content)
	}

	pub fn update_dm(ctx: Context<UpdateDm>, new_content: String) -> Result<()> {
		instructions::update_dm(ctx, new_content)
	}

	pub fn delete_dm(_ctx: Context<DeleteDm>) -> Result<()> {
		instructions::delete_dm(_ctx)
	}

	// User-Alias Instructions 
	pub fn create_user_alias(ctx: Context<CreateUserAlias>, alias: String) -> Result<()> {
		instructions::create_user_alias(ctx, alias)
	}

	pub fn update_user_alias(ctx: Context<UpdateUserAlias>, new_alias: String) -> Result<()> {
		instructions::update_user_alias(ctx, new_alias)
	}

	pub fn delete_user_alias(_ctx: Context<DeleteUserAlias>) -> Result<()> {
		instructions::delete_user_alias(_ctx)
	}
    
	// Status Instructions
	pub fn create_status(ctx: Context<CreateStatus>, alias: String) -> Result<()> {
		instructions::create_status(ctx, alias)
	}

	pub fn update_status(ctx: Context<UpdateStatus>, new_alias: String) -> Result<()> {
		instructions::update_status(ctx, new_alias)
	}

	pub fn delete_status(_ctx: Context<DeleteStatus>) -> Result<()> {
		instructions::delete_status(_ctx)
	}
}

