import { PublicKey } from "@solana/web3.js"

interface Account {
  content: string,
  user: string | PublicKey,
  tag: string,
  state: string | null 
}

export interface TweetType {
   account: Account
  }


  export const createNewTweet = (content: string , tag: string , state: string | null , userKey: string) => {
    return {
      account: {
        user: userKey,
        state: state,
        tag: tag,
        content: content,
      }
    }
  }