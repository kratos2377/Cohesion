use crate::errors::ErrorMessage;
use crate::state::status::*;
use anchor_lang::prelude::*;

pub fn create_status(ctx: Context<CreateStatus>, message: String) -> Result<()> {
	let status = &mut ctx.accounts.status;

	require!(message.chars().count() <= 50, ErrorMessage::TooLong);

	status.message = message;
	status.bump = *ctx.bumps.get("status").unwrap();

	Ok(())
}

pub fn update_status(ctx: Context<UpdateStatus>, new_message: String) -> Result<()> {
	let status = &mut ctx.accounts.status;

	require!(status.message != new_message, ErrorMessage::NothingChanged);
	require!(status.message.chars().count() <= 50, ErrorMessage::TooLong);

	status.message = new_message;

	Ok(())
}

pub fn delete_status(_ctx: Context<DeleteStatus>) -> Result<()> {
	Ok(())
}
