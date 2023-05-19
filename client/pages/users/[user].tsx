import Loading from '@/components/Loading';
import TweetCard from '@/components/TweetCard';
import { authorTweets } from '@/rpc-calls/fetchTweets';
import { TweetType } from '@/types/TweetTypes';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const User = () => {
  const [loading , setLoading] = useState(true);

  const router = useRouter()
  const [userAddress , setUserAddress] = useState(router.query.user)
  const [errorExists , setErrorExists] = useState(false)
  const [errorMessage , setErrorMessage] = useState("")
  const [tweets , setTweets] = useState<TweetType[]>([])

  const fetchUserTweets = async () => {
      await authorTweets(userAddress as string)
        .then((fetchedTweets) => setTweets(fetchedTweets))
        .finally(() => setLoading(false))
    
  }


  useEffect(() => {
   fetchUserTweets()
  }, [])


  
  const  setErrorMessageAndDuration = (message: string, duration: number) =>  {

    setErrorMessage(message)
    setErrorExists(true)
    setTimeout(() => {
      setErrorExists(false)
      setErrorMessage("")
    }, duration);
  }


  return (
    <div>

    <div className="text-2xl text-white m-5 mx-10">
     {userAddress} Posts
          </div>
    
          { errorExists ? <div className="w-100 mx-5 p-4 mb-4 z-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {errorMessage}
</div> : <> </>
 }
    
    <div className='mx-8 my-3'>
    {
      loading ? <div className='mt-8'><Loading/> </div> :  <div > 
     {tweets.map( (ele) =>  <TweetCard  tweetKey={ele.publicKey.toBase58()} tag={ele.account.tag} author={ele.account.user.toBase58()} content={ele.account.content} /> )}
     </div>
     }
    </div>
    
        </div>
  )
}

export default User