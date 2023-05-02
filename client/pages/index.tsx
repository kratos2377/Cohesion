import { useEffect, useState } from 'react';
import Login from '@/components/Login'
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Home() {

  const [loading , setLoading] = useState(true)
  const [iswallet , setIsWallet] = useState(false)
  const wallet = useWallet()
  const {push} = useRouter()


  useEffect(() => {
    if(wallet.connected) {
      setIsWallet(true)
      setTimeout(() => {
        setIsWallet(true)
      }, 1000)
    
      
    } 


    setLoading(false)
  } , [])
  return  (loading ? <div>Loading....</div> :  (
    iswallet ? <div>Redirecting..... </div> :  <div>
    <Login/>
    </div>
   ) )
  
}
