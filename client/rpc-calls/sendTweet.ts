import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '../utils/useWorkspace'

// 1. Define the sendTweet endpoint.
export const sendTweet = async (tag: string, content: string) => {
  const { wallet, program } = useWorkspace()

  // 2. Generate a new Keypair for our new tweet account.
  const tweetKey = web3.Keypair.generate()
  // 3. Send  a "SendTweet" instruction with the right data and the right accounts.
  await program.rpc.sendTweet(tag, content, {
    accounts: {
      tweet: tweetKey.publicKey,
      user: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [tweetKey],
  })

  // // 4. Fetch the newly created account from the blockchain.
  const tweetAccount = await program.account.tweet.fetch(tweetKey.publicKey)

  // // 5. Wrap the fetched account in a Tweet model so our frontend can display it.
   return  [tweetKey.publicKey , tweetAccount]
}
