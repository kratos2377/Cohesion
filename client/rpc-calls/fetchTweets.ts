import bs58 from 'bs58'
import { useWorkspace } from '../utils/useWorkspace'

export const fetchTweets = async (filters = []) => {
  const { program } = useWorkspace()
  const tweets = await program.account.tweet.all(filters)


  console.log("All tweets recieved are: " , tweets)
  return tweets
}

export const authorFilter = (authorBase58PublicKey: string) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  },
})

export const topicFilter = (topic: string) => ({
  memcmp: {
    offset:
      8 + // Discriminator.
      32 + // Author public key.
      8 + // Timestamp.
      4, // Topic string prefix.
    bytes: bs58.encode(Buffer.from(topic)),
  },
})
