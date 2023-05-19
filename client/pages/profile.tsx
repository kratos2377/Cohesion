import Loading from '@/components/Loading';
import NoTweets from '@/components/NoTweets';
import TweetCard from '@/components/TweetCard';
import WriteTweetArea from '@/components/WriteTweetArea';
import { authorTweets } from '@/rpc-calls/fetchTweets';
import { TweetType } from '@/types/TweetTypes';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react'




const Profile = () => {
 
  const [errorExists , setErrorExists] = useState(false)
  const [errorMessage , setErrorMessage] = useState("")
  const [successfulMessageExists , setSuccessfulMessageExists] = useState(false)
  const [successfulMessage , setSuccessfulMessage] = useState("")
  const [loading , setLoading] = useState(true);
  const [loadedTweets , setTweets] = useState<TweetType[]>([])
  const wallet = useAnchorWallet()

  useEffect(() => {
    if(!wallet)
     return

      authorTweets(wallet.publicKey.toBase58()).then((fetchTweets) => {
        setTweets(fetchTweets)
      }).finally(() => setLoading(false))
  }, [])


const  setErrorMessageAndDuration = (message: string, duration: number) =>  {
  setSuccessfulMessageExists(false)
  setErrorMessage(message)
  setErrorExists(true)
  setTimeout(() => {
    setErrorExists(false)
    setErrorMessage("")
  }, duration);
}

const  setSuccessfulMessageAndDuration = (message: string, duration: number) =>  {
  setErrorExists(false)
  setSuccessfulMessage(message)
  setSuccessfulMessageExists(true)
  setTimeout(() => {
    setSuccessfulMessageExists(false)
    setSuccessfulMessage("")
  }, duration);
}

const addTweet = (tweet: TweetType) => {
  setSuccessfulMessageAndDuration("Tweet Posted Successfully" , 3000)
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

{ successfulMessageExists ? <div className="w-100 mx-5 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-center" role="alert">
  {successfulMessage}
</div> : <> </>
 }
      <div className='mx-10 my-3'>
    <WriteTweetArea setErrorMessageAndDuration={setErrorMessageAndDuration} addTweet={addTweet} userKey={wallet?.publicKey.toBase58()}/>
</div>

<div className='mx-8 my-3'>
{
  loading ? <div className='mt-8'><Loading/> </div> :  <div > 
 { loadedTweets.length === 0 ? <NoTweets message={"You have not posted any tweets"}/>   : loadedTweets.map( (ele , index) =>  <TweetCard key = {index}  tag={ele.account.tag} author={ele.account.user.toBase58()} content={ele.account.content}  /> )}
 </div>
 }
</div>
    </div>
  )
}

export default Profile