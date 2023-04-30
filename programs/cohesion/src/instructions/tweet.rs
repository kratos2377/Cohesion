use crate::errors::ErrorMessage;
use crate::state::tweet::*;
use anchor_lang::prelude::*;

pub fn send_tweet(ctx: Context<SendTweet>, mut tag: String, content: String) -> Result<()> {
	let tweet = &mut ctx.accounts.tweet;
	let user: &Signer = &ctx.accounts.user;
	let clock: Clock = Clock::get().unwrap();

	require!(tag.chars().count() <= 50, ErrorMessage::TooLong);
	require!(tag.chars().all(|c| c.is_alphanumeric() || c == '-'), ErrorMessage::UnallowedChars);
	require!(content.chars().count() <= 280, ErrorMessage::TooLong);
	require!(content.chars().count() > 0, ErrorMessage::NoContent);

	if tag == "" {
		tag = "[untagged]".to_string()
	}

	tweet.user = *user.key;
	tweet.timestamp = clock.unix_timestamp;
	tweet.tag = tag.to_lowercase();
	tweet.content = content;

	Ok(())
}

pub fn update_tweet(ctx: Context<UpdateTweet>, new_tag: String, new_content: String) -> Result<()> {
	let tweet = &mut ctx.accounts.tweet;

	require!(tweet.tag != new_tag || tweet.content != new_content, ErrorMessage::NothingChanged);
	require!(new_tag.chars().count() <= 50, ErrorMessage::TooLong);
	require!(new_content.chars().count() <= 280, ErrorMessage::TooLong);
	require!(new_content.chars().count() > 0, ErrorMessage::NoContent);

	tweet.tag = new_tag;
	tweet.content = new_content;
	tweet.state = Some(TweetState::Edited);

	Ok(())
}

//not deleting entire tweet because children(comments) who rely on the tweets publickey 
// shouldn't become error driven orphans
pub fn delete_tweet(ctx: Context<DeleteTweet>) -> Result<()> {
	let tweet = &mut ctx.accounts.tweet;

	tweet.tag = "[deleted]".to_string();
	tweet.content = "".to_string();
	tweet.state = Some(TweetState::Deleted);

	Ok(())
}
