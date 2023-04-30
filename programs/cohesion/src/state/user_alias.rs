use anchor_lang::prelude::*;



const DISCRIMINATOR_LENGTH: usize = 8;
const PREFIX_LENGTH: usize = 4;
const ALIAS_TOTAL_LENGTH: usize = 50*4;
const BUMP_LENGTH: usize = 1;

#[account]
pub struct UserAlias {
	pub alias: String,
	pub bump: u8,
}

impl UserAlias {
	const LEN: usize = DISCRIMINATOR_LENGTH + PREFIX_LENGTH + ALIAS_TOTAL_LENGTH
						+ BUMP_LENGTH;
}

#[derive(Accounts)]
pub struct CreateUserAlias<'info> {
	#[account(init, payer = user, space = UserAlias::LEN, seeds = [b"user-alias", user.key().as_ref()], bump)]
	pub user_alias: Account<'info, UserAlias>,
	pub system_program: Program<'info, System>,
	#[account(mut)]
	pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdateUserAlias<'info> {
	pub user: Signer<'info>,
	#[account(mut, seeds = [b"user-alias", user.key().as_ref()], bump = user_alias.bump)]
	pub user_alias: Account<'info, UserAlias>,
}

#[derive(Accounts)]
pub struct DeleteUserAlias<'info> {
	pub user: Signer<'info>,
	#[account(mut, close = user, seeds = [b"user-alias", user.key().as_ref()], bump = user_alias.bump)]
	pub user_alias: Account<'info, UserAlias>,
}
