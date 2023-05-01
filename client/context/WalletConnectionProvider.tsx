import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { ExodusWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { FC, useMemo } from 'react'
import { SOLANA_HOST } from '../utils/const'

interface WalletProps {
    children: JSX.Element | JSX.Element[] | string
}

const WalletConnectionProvider = ({ children }: WalletProps) => {
  // const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork;
  const endpoint = useMemo(() => SOLANA_HOST, [])

  const wallets = useMemo(() => [new PhantomWalletAdapter() , new SolflareWalletAdapter() , new ExodusWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletConnectionProvider
