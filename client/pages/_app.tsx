import '@/styles/globals.css'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect } from 'react'
require('@solana/wallet-adapter-react-ui/styles.css')

const WalletConnectionProvider = dynamic(
  () => import('../context/WalletConnectionProvider'),
  {
    ssr: false,
  },
)

export default function App({ Component, pageProps }: AppProps) {
  const {push} = useRouter()
  const router = useRouter()
  const wallet = useWallet()


  useEffect( () => {
    if(wallet.connected) {
      push("home")
    }
  } , [wallet])
  return (
    <WalletConnectionProvider>
      {
        router.pathname === "/" ? <Component {...pageProps} /> : <Layout>
        <Component {...pageProps} />
        </Layout>
      }
    </WalletConnectionProvider>
  );
}
