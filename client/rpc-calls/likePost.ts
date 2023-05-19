import { useWorkspace } from "@/utils/useWorkspace"
import { web3 } from '@project-serum/anchor'
import { Keypair, PublicKey } from "@solana/web3.js"
import bs58 from "bs58"

export enum VotingResult {
    Like,
    NoVoting,
    Dislike 
  }



export const likeTweet = async (tweetKey: string , voteType: VotingResult ) => {
    const { wallet, program } = useWorkspace()
    const voting = web3.Keypair.generate()
    const likeTweetKey = new PublicKey(tweetKey)
    const userPair = web3.Keypair.generate()
    const publicKeyArray: Uint8Array = wallet.publicKey.toBuffer();
    await program.rpc.vote(likeTweetKey, {like: {}},1 , {
      accounts: {
        voting: voting.publicKey,
        user: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [userPair],
    })

    const votingAccount = await program.account.voting.fetch(voting.publicKey)

    return votingAccount
  }