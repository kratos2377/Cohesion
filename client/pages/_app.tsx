import '@/styles/globals.css'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
require('@solana/wallet-adapter-react-ui/styles.css')

const WalletConnectionProvider = dynamic(
  () => import('../context/WalletConnectionProvider'),
  {
    ssr: false,
  },
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectionProvider>
      <Component {...pageProps} />
    </WalletConnectionProvider>
  );
}
