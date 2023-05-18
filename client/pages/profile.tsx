import Loading from '@/components/Loading';
import TweetCard from '@/components/TweetCard';
import WriteTweetArea from '@/components/WriteTweetArea';
import { authorFilter, fetchTweets } from '@/rpc-calls/fetchTweets';
import { TweetType } from '@/types/TweetTypes';
import { initWorkspace } from '@/utils/useWorkspace';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react'




const Profile = () => {
 
  const [errorExists , setErrorExists] = useState(false)
  const [errorMessage , setErrorMessage] = useState("")
  const [loading , setLoading] = useState(true);
  const [loadedTweets , setTweets] = useState<TweetType[]>([])
  const wallet = useAnchorWallet()
  let ar = [1 , 2]

  useEffect(() => {
    if(!wallet)
     return

      fetchTweets([authorFilter(wallet.publicKey.toBase58())]).then((fetchTweets) => {
        console.log("Profile tweets are: " , fetchTweets)
      }).finally(() => setLoading(false))
  }, [])


const  setErrorMessageAndDuration = (message: string, duration: number) =>  {

  setErrorMessage(message)
  setErrorExists(true)
  setTimeout(() => {
    setErrorExists(false)
    setErrorMessage("")
  }, duration);
}

const addTweet = (tweet: TweetType) => {
  setTweets([tweet , ...loadedTweets])
}
  
  return (
    <div>

<div className="text-2xl text-white m-5 mx-10">
Your Posts
      </div>

      { errorExists ? <div className="w-100 mx-5 p-4 mb-4 z-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {errorMessage}
</div> : <> </>
 }
      <div className='mx-10 my-3'>
    <WriteTweetArea setErrorMessageAndDuration={setErrorMessageAndDuration} addTweet={addTweet}/>
</div>

<div className='mx-8 my-3'>
{
  loading ? <div className='mt-8'><Loading/> </div> :  <div > 
 {ar.map( (ele) =>  <TweetCard author={'admasida7sd67aufbiuadshf89ad6fa76dtsfasdyufgylasdf7'} content={"ASDSADUUDASHDUHASDHGASDHISADHSAHDHDHISAD"} commentCount={23} likeCount={12} tag={"test"} /> )}
 </div>
 }
</div>
    </div>
  )
}

export default Profile