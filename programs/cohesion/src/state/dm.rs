use anchor_lang::prelude::*;

const DISCRIMINATOR_LENGTH: usize = 8;
const USER_LENGTH: usize = 32;
const RECIPIENT_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const PREFIX_LENGTH: usize = 4;
const CONTENT_LENGTH: usize = 280*4;
const EDITED_STATE_LENGTH: usize = 1;

#[account]
pub struct Dm {
	pub user: Pubkey,
	pub recipient: Pubkey,
	pub timestamp: i64,
	pub content: String,
	pub edited: bool,
}


impl Dm {
	const LEN: usize = DISCRIMINATOR_LENGTH + USER_LENGTH + RECIPIENT_LENGTH + TIMESTAMP_LENGTH + PREFIX_LENGTH + CONTENT_LENGTH + EDITED_STATE_LENGTH;
}

#[derive(Accounts)]
pub struct SendDm<'info> {
	#[account(init, payer = user, space = Dm::LEN + 1)]
	pub dm: Account<'info, Dm>,
	#[account(mut)]
	pub user: Signer<'info>,
	pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateDm<'info> {
	#[account(mut, has_one = user)]
	pub dm: Account<'info, Dm>,
	pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteDm<'info> {
	#[account(mut, has_one = user, close = user)]
	pub dm: Account<'info, Dm>,
	pub user: Signer<'info>,
}
