import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
const Login = () => {
  const wallet = useWallet()
  const {push } = useRouter()
    useEffect(() => {
      if(wallet.connected) {
       push("/home")
      }
    } , [wallet]) 

  return (
 <div className={styles.loginPage}>
    <Image
         src="/logo.svg"
         alt="Cohesion Logo"
         className="m-10 relative light:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
         width={100}
         height={24}
         priority
       />
   <div className={styles.description}>
   Cohesion is a social platform build on solana blockchain.
   </div>
 <p className={styles.text}>Login to access this app</p>
 <WalletMultiButton />
</div>
  )
}

export default Login

const styles = {
  description: 'text-2xl text-white mb-3',
  loginPage: `w-screen h-screen  bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r flex justify-center flex-col items-center`,
  text: `text-4xs text-white mb-10`,
}