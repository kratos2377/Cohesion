use anchor_lang::prelude::*;


const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const TWEET_LENGTH: usize = 32; 
const VOTING_RESULT: usize = 1; 
const BUMP_LENGTH: usize = 1;


#[account]
pub struct Voting {
	pub user: Pubkey,
	pub tweet: Pubkey,
	pub timestamp: i64,
	pub result: VotingResult,
	pub bump: u8,
}

impl Voting {
    const LEN: usize = DISCRIMINATOR_LENGTH 
                    + PUBLIC_KEY_LENGTH
                    + TWEET_LENGTH
                    + TIMESTAMP_LENGTH+ VOTING_RESULT
                    + BUMP_LENGTH;
}

#[derive(Accounts)]
#[instruction(tweet: Pubkey)]
pub struct Vote<'info> {
	#[account(init, 
        payer = user, 
        space = Voting::LEN, 
        seeds = [b"voting", user.key().as_ref(), tweet.key().as_ref()], 
        bump)]
	pub voting: Account<'info, Voting>,
	pub system_program: Program<'info, System>,
	#[account(mut)]
	pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateVoting<'info> {
	pub user: Signer<'info>,
	#[account(mut,
        seeds = [b"voting", user.key().as_ref(), voting.tweet.key().as_ref()], 
        bump = voting.bump)]
	pub voting: Account<'info, Voting>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum VotingResult {
	Like,
	NoVoting,
	Dislike,
}
