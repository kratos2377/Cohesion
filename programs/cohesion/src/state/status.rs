use anchor_lang::prelude::*;


const DISCRIMINATOR_LENGTH: usize = 8;
const PREFIX_LENGTH: usize = 4;
const STATUS_TOTAL_LENGTH: usize = 50*4;
const BUMP_LENGTH: usize = 1;

#[account]
pub struct Status {
	pub message: String,
	pub bump: u8,
}

impl Status {
	const LEN: usize = DISCRIMINATOR_LENGTH + PREFIX_LENGTH + STATUS_TOTAL_LENGTH
						+ BUMP_LENGTH;
}

#[derive(Accounts)]
pub struct CreateStatus<'info> {
	#[account(init, payer = user, space = Status::LEN, seeds = [b"status", user.key().as_ref()], bump)]
	pub status: Account<'info, Status>,
	pub system_program: Program<'info, System>,
	#[account(mut)]
	pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateStatus<'info> {
	pub user: Signer<'info>,
	#[account(mut, seeds = [b"status", user.key().as_ref()], bump = status.bump)]
	pub status: Account<'info, Status>,
}

#[derive(Accounts)]
pub struct DeleteStatus<'info> {
	pub user: Signer<'info>,
	#[account(mut, close = user, seeds = [b"status", user.key().as_ref()], bump = status.bump)]
	pub status: Account<'info, Status>,
}
