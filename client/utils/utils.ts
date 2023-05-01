import { Program, AnchorProvider, web3, Wallet } from "@project-serum/anchor";
import { Connection } from '@solana/web3.js'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { STABLE_POOL_IDL, STABLE_POOL_PROGRAM_ID } from './const'
import { WalletContextState } from '@solana/wallet-adapter-react'

// This command makes an Lottery
export function getProgramInstance(connection: Connection, wallet: Wallet) {
  if (!wallet.publicKey) throw new WalletNotConnectedError()

  const provider = new AnchorProvider(connection, wallet , AnchorProvider.defaultOptions());
  // Read the generated IDL.
  const idl = STABLE_POOL_IDL

  // Address of the deployed program.
  const programId = STABLE_POOL_PROGRAM_ID

  // Generate the program client from IDL.
  const program = new Program(idl, programId, provider)

  return program
}
