import { useWorkspace } from "@/utils/useWorkspace"
import { web3 } from "@project-serum/anchor"
import { PublicKey } from "@solana/web3.js"



export const sendComment = async (base58PublicKey: string , content: string , parent: string) => {
    const { wallet, program } = useWorkspace()

    // 2. Generate a new Keypair for our new tweet account.
    const commentKey = web3.Keypair.generate()
    const publicKey = new PublicKey(base58PublicKey);
    const parentPublicKey = new PublicKey(parent)
    // 3. Send  a "send comment" instruction with the right data and the right accounts.
    await program.rpc.sendComment(publicKey, content, parentPublicKey ,  {
      accounts: {
        comment: commentKey.publicKey,
        user: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [commentKey],
    })
  
    // // 4. Fetch the newly created account from the blockchain.
    const commentAccount = await program.account.comment.fetch(commentKey.publicKey)
    console.log("THe recent posted comment is: " , commentAccount)
     return  commentAccount 
}