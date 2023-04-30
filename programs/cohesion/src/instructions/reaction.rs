use crate::errors::ErrorMessage;
use crate::state::reaction::*;
use anchor_lang::prelude::*;

pub fn react(ctx: Context<React>, tweet: Pubkey, input_char: String, reaction_bump: u8) -> Result<()> {
	let reaction = &mut ctx.accounts.reaction;
	let reaction_char = ReactionChar::validate(input_char.chars().nth(0).unwrap());

	require!(reaction_char != ReactionChar::Invalid, ErrorMessage::UnallowedChars);

	reaction.user = *ctx.accounts.user.key;
	reaction.tweet = tweet;
	reaction.reaction_char = reaction_char;
	reaction.bump = reaction_bump;

	Ok(())
}

pub fn update_reaction(ctx: Context<UpdateReaction>, input_char: String) -> Result<()> {
	let reaction = &mut ctx.accounts.reaction;
	let reaction_char = ReactionChar::validate(input_char.chars().nth(0).unwrap());

	require!(reaction.reaction_char != reaction_char, ErrorMessage::NothingChanged);
	reaction.reaction_char = reaction_char;
	Ok(())
}

pub fn delete_reaction(_ctx: Context<DeleteReaction>) -> Result<()> {
	Ok(())
}

impl ReactionChar {
	fn validate(reaction_char: char) -> Self {
		match reaction_char {
			'👍' => Self::ThumbsUp,
			'🎉' => Self::Party,
			'😆' => Self::Haha,
			'😲' => Self::Wow,
			'🚀' => Self::Rocket,
			'👀' => Self::Eyes,
			_ => Self::Invalid,
		}
	}
}
