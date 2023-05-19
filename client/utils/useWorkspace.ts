import { Connection, PublicKey } from '@solana/web3.js'
import { Program,  Provider, web3 } from '@project-serum/anchor'
import idl from '../idl/cohesion.json'
import { AnchorWallet, WalletContextState } from '@solana/wallet-adapter-react'

const preflightCommitment = 'processed'
const commitment = 'processed'
const programID = new PublicKey(idl.metadata.address)
let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = (wallet, connection: Connection) => {
  console.log("The secret key is: " , wallet)

  const provider = new Provider(connection, wallet, {
    preflightCommitment,
    commitment,
  })
  const program = new Program(idl, programID, provider)

  workspace = {
    wallet,
    connection,
    provider,
    program,
  }
}
