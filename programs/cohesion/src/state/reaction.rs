use anchor_lang::prelude::*;


const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const REACTIONCHAR_LENGTH: usize = 1;
const BUMP_LENGTH: usize = 1;



#[account]
pub struct Reaction {
	pub user: Pubkey,
	pub tweet: Pubkey,
	pub reaction_char: ReactionChar,
	pub bump: u8,
}


impl Reaction {
	const LEN: usize = DISCRIMINATOR_LENGTH + PUBLIC_KEY_LENGTH + TIMESTAMP_LENGTH + REACTIONCHAR_LENGTH + BUMP_LENGTH;
}

#[derive(Accounts)]
#[instruction(tweet: Pubkey)]
pub struct React<'info> {
	#[account(init, 
        payer = user, 
        space = Reaction::LEN
        seeds = [b"reaction", user.key().as_ref(), tweet.key().as_ref()], 
        bump)]
	pub reaction: Account<'info, Reaction>,
	pub system_program: Program<'info, System>,
	#[account(mut)]
	pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateReaction<'info> {
	pub user: Signer<'info>,
	#[account(mut,
        seeds = [b"reaction", user.key().as_ref(), reaction.tweet.key().as_ref()], 
        bump = reaction.bump)]
	pub reaction: Account<'info, Reaction>,
}

#[derive(Accounts)]
pub struct DeleteReaction<'info> {
	pub user: Signer<'info>,
	#[account(mut, close = user, seeds = [b"reaction", user.key().as_ref(), reaction.tweet.key().as_ref()], bump = reaction.bump)]
	pub reaction: Account<'info, Reaction>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, PartialOrd)]
pub enum ReactionChar {
	ThumbsUp,
	Party,
	Haha,
	Wow,
	Rocket,
	Eyes,
	Invalid,
}
