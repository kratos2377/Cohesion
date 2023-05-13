import { useEffect, useState } from 'react';
import Login from '@/components/Login'
import { useRouter } from 'next/router';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import Loading from '@/components/Loading';
import { initWorkspace } from '@/utils/useWorkspace';

export default function Home() {

  const [loading , setLoading] = useState(true)
  const [iswallet , setIsWallet] = useState(false)
  const {push} = useRouter()

  const wallet = useWallet()
  const anchorWallet = useAnchorWallet()
  const { connection } = useConnection()

  initWorkspace(anchorWallet, connection)


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
