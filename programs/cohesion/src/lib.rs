use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");


const TEXT_LENGTH: usize = 1024;
const USER_NAME_LENGTH: usize = 100;
const USER_URL_LENGTH: usize = 255;

#[program]
pub mod cohesion {
    use super::*;

    pub fn create_state(
        ctx: Context<CreateState>,
    ) -> ProgramResult {
        let state = &mut ctx.accounts.state;
        state.authority = ctx.accounts.authority.key();
        state.post_count = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
