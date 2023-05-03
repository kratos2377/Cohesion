import { useEffect, useState } from 'react';
import Login from '@/components/Login'
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';
import Loading from '@/components/Loading';

export default function Home() {

  const [loading , setLoading] = useState(true)
  const [iswallet , setIsWallet] = useState(false)
  const wallet = useWallet()
  const {push} = useRouter()


  useEffect(() => {
    if(wallet.connected) {
      setIsWallet(true)
      setTimeout(() => {
        push("/home")
      }, 1000)
    
      
    } 


    setLoading(false)
  } , [])
  return  (loading ? <div className='mt-8'><Loading/></div> :  (
    iswallet ? <div>Redirecting..... </div> :  <div>
    <Login/>
    </div>
   ) )
  
}
