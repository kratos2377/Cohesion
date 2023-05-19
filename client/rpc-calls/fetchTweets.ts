import bs58 from 'bs58'
import { useWorkspace } from '../utils/useWorkspace'

export const fetchTweets = async (filters = []) => {
  const { program } = useWorkspace()
  const tweets = await program.account.tweet.all(filters)
  const votings = await program.account.voting.all([])

  console.log("Voting accounts are: " , votings)
  return tweets
}

export const authorTweets = async (authorBase58PublicKey: string) => {
  const { program } = useWorkspace()
  const tweets = await program.account.tweet.all( [{
    memcmp: {
      offset: 8, // Discriminator.
      bytes: authorBase58PublicKey,
    },
  } ]
)



  return tweets

}

export const topicWiseTweets = async (topic: string) => {

  const { program } = useWorkspace()
  const tweets = await program.account.tweet.all([ {
    memcmp: {
      offset:
        8 + // Discriminator.
        32 + // Author public key.
        8 + // Timestamp.
        4, // Topic string prefix.
      bytes: bs58.encode(Buffer.from(topic)),
    },
  } ]
)

  return tweets

}
