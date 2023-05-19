import { PublicKey } from "@solana/web3.js"

interface Account {
  content: string,
  user: string | PublicKey,
  state: string | null 
}

export interface CommentType {
   account: Account
  }


