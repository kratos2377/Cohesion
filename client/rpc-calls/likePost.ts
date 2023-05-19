import { useWorkspace } from "@/utils/useWorkspace"
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils"
import { web3 } from '@project-serum/anchor'
import { PublicKey } from "@solana/web3.js"


export enum VotingType {
    Like = "Like",
    NoVoting = "NoVoting",
    Dislike = "Dislike" 
  }

export const likeTweet = async (tweetKey: PublicKey , voteType: VotingType ) => {
    const { wallet, program } = useWorkspace()
    const voting = web3.Keypair.generate()
    await program.rpc.vote(tweetKey, voteType, 5 , {
      accounts: {
        voting: voting.publicKey,
        user: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [voting],
    })

    const votingAccount = await program.account.voting.fetch(voting.publicKey)

    return votingAccount
  }