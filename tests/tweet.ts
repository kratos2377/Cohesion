import * as assert from "assert";
import * as anchor from "@project-serum/anchor";
import { program, user } from "../tests";
import { createUser } from "./utils";
import { Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";

// Helper function to send tweets from `provider.wallet`(default user in this tests) and other generated users(keypair-wallets)
export const sendTweet = async (user, tag: string, content: string) => {
	const tweetKeypair = Keypair.generate();

	await program.methods
		.sendTweet(tag, content)
		.accounts({
			tweet: tweetKeypair.publicKey,
			user: user.publicKey,
			systemProgram: anchor.web3.SystemProgram.programId,
		})
		.signers(
			user instanceof anchor.Wallet ? [tweetKeypair] : [user, tweetKeypair]
		)
		.rpc();

	// Fetch the created tweet and return it's pubkey and contents(account)
	const tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
	return { publicKey: tweetKeypair.publicKey, account: tweet };
};

export default () => {
	it("can send and update tweets", async () => {
		// Send tweet no.1
		const tweet = await sendTweet(user, "anime", "Naruto is one of the best shonen");
		assert.equal(tweet.account.user.toBase58(), user.publicKey.toBase58());
		assert.equal(tweet.account.tag, "anime");
		assert.equal(tweet.account.content, "Naruto is one of the best shonen");
		assert.ok(tweet.account.timestamp);

		// Send tweet no.2 as another user
		const otherUser = await createUser();
		const tweetTwo = await sendTweet(otherUser, "anime", "Watch Attack on titan!");
		assert.equal(
			tweetTwo.account.user.toBase58(),
			otherUser.publicKey.toBase58()
		);
		assert.equal(tweetTwo.account.tag, "anime");
		assert.equal(tweetTwo.account.content, "Watch Attack on titan!");
		assert.ok(tweetTwo.account.timestamp);

		// Update tweet no.2
		await program.methods
			.updateTweet("games", "Elden ring is GOTY!")
			.accounts({ tweet: tweetTwo.publicKey, user: otherUser.publicKey })
			.signers([otherUser])
			.rpc();

		// Fetch updated tweets state to check if it has the right data
		const updatedTweet = await program.account.tweet.fetch(tweetTwo.publicKey);
		assert.equal(updatedTweet.tag, "games");
		assert.equal(updatedTweet.content, "Elden ring is GOTY!");
		assert.deepEqual(updatedTweet.state, { edited: {} });
	});

	it("can send a tweet without a tag", async () => {
		// Send tweet no.3 (no.2 by userOne)
		const tweet = await sendTweet(user, "", "gm");
		assert.equal(tweet.account.user.toBase58(), user.publicKey.toBase58());
		assert.equal(tweet.account.tag, "[untagged]");
		assert.equal(tweet.account.content, "gm");
		assert.ok(tweet.account.timestamp);
	});

	it("cannot send a tweet without content", async () => {
		try {
			await sendTweet(user, "gm", "");
		} catch (err) {
			assert.equal(err.error.errorCode.code, "NoContent");
			return;
		}

		assert.fail("Sent a tweet without content.");
	});

	it("cannot send a tweet with a tag > 50 or content > 280 characters", async () => {
		await (async () => {
			try {
				const tagWith51Chars = "x".repeat(51);
				await sendTweet(user, tagWith51Chars, "takes over!");
			} catch (err) {
				assert.equal(err.error.errorCode.code, "TooLong");
				return;
			}

			assert.fail("Sent a tweet with a longer tag than allowed.");
		})();

		await (async () => {
			try {
				const contentWith281Chars = "x".repeat(281);
				await sendTweet(user, "anime", contentWith281Chars);
			} catch (err) {
				assert.equal(err.error.errorCode.code, "TooLong");
				return;
			}

			assert.fail("Sent a tweet with longer content than allowed.");
		})();
	});

	it("cannot update a tweet without changes", async () => {
		// Send tweet no.4 (no.3 by userOne)
		const tweet = await sendTweet(user, "web3", "takes over!");
		assert.equal(tweet.account.tag, "web3");
		assert.equal(tweet.account.content, "takes over!");
		assert.equal(tweet.account.state, null);

		// Try to update tweet without changes
		try {
			await program.methods
				.updateTweet("web3", "takes over!")
				.accounts({ tweet: tweet.publicKey, user: user.publicKey })
				.rpc();
		} catch (error) {
			assert.equal(error.error.errorCode.code, "NothingChanged");
			return;
		}

		assert.fail("Updated a tweet without changes.");
	});

	it("can delete own tweets", async () => {
		// Send tweet no.5 (no.4 by userOne)
		const tweetToDelete = await sendTweet(user, "gm", "Can I delete this?");

		await program.methods
			.deleteTweet()
			.accounts({
				tweet: tweetToDelete.publicKey,
				user: user.publicKey,
			})
			.rpc();
		const deletedTweet = await program.account.tweet.fetch(
			tweetToDelete.publicKey
		);
		assert.equal(deletedTweet.tag, "[deleted]");
		assert.equal(deletedTweet.content, "");

		// Try to delete other users tweet
		const otherUser = await createUser();
		// Send tweet no.6
		const tweet = await sendTweet(otherUser, "solana", "gm");
		try {
			await program.methods
				.deleteTweet()
				.accounts({ tweet: tweet.publicKey, user: user.publicKey })
				.rpc();
		} catch (error) {
			// Check if tweet account still exists with the right data
			const tweetState = await program.account.tweet.fetch(tweet.publicKey);
			assert.equal(tweetState.tag, "solana");
			assert.equal(tweetState.content, "gm");
			return;
		}

		assert.fail("Delete someone else's tweet");
	});

	it("can fetch and filter tweets", async () => {
		const allTweets = await program.account.tweet.all();
		assert.equal(allTweets.length, 6);

		const userTweets = await program.account.tweet.all([
			// offset: 8 Discriminator
			{ memcmp: { offset: 8, bytes: user.publicKey.toBase58() } },
		]);
		// Check if the fetched amount of tweets is equal to those the use sent
		assert.equal(userTweets.length, 4);
		assert.ok(
			userTweets.every(
				(tweet) => tweet.account.user.toBase58() === user.publicKey.toBase58()
			)
		);

		const tagTweets = await program.account.tweet.all([
			// offset: 8 Discriminator + 32 User public key + 8 Timestamp + 4 Tag string prefix
			{
				memcmp: {
					offset: 8 + 32 + 8 + 4,
					bytes: bs58.encode(Buffer.from("anime")),
				},
			},
		]);
		assert.equal(tagTweets.length, 1);
		assert.ok(
			tagTweets.every((tweetAccount) => tweetAccount.account.tag === "anime")
		);
	});
};
