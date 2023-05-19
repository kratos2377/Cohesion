import { useWorkspace } from "@/utils/useWorkspace"
import { web3 } from '@project-serum/anchor'
import * as anchor from "@project-serum/anchor";
import { Keypair, PublicKey } from "@solana/web3.js"
import bs58 from "bs58"

export enum VotingResult {
    Like,
    NoVoting,
    Dislike 
  }



export const likeTweet = async (tweetKey: string , voteType: VotingResult ) => {
    const { wallet, program } = useWorkspace()
    const likeTweetKey = new PublicKey(tweetKey)
    const [votingPDA, bump] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("voting"),
        wallet.publicKey.toBuffer(),
        likeTweetKey.toBuffer(),
      ],
      program.programId
    );
    await program.rpc.vote(likeTweetKey, {like: {}},  bump , {
      accounts: {
        voting: votingPDA,
        user: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [],
    })
    
    const votingAccount = await program.account.voting.fetch(votingPDA)

    return votingAccount
  }