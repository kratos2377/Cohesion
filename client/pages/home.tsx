import Loading from '@/components/Loading'
import NoTweets from '@/components/NoTweets'
import TweetCard from '@/components/TweetCard'
import { fetchTweets } from '@/rpc-calls/fetchTweets'
import { TweetType } from '@/types/TweetTypes'
import { initializeTagsMap } from '@/utils/createTagAndUserMap'
import React, { useEffect, useState } from 'react'



const HomeFeed = () => {

  const [loadingTweet , setLoading] = useState(true)
  const [loadedTweets , setLoadedTweets] = useState<TweetType[]>([])
  const [errorExists , setErrorExists] = useState(false)
  const [errorMessage , setErrorMessage] = useState("")

  
  const fetchAllTweets= async () => {
    const tweets = await fetchTweets();

    initializeTagsMap(tweets)
    setLoadedTweets([...tweets])
  }


  useEffect(() => {
    fetchAllTweets().then(() => {
     
        setLoading(false)
    }).catch((err) => {

      console.log(err)
    })
  } , [])

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
        {
          loadingTweet ? <div className='mt-8'><Loading/> </div> :      <> <div className="text-2xl text-white m-5">
          Latest Posts
        </div>
        { errorExists ? <div className="w-100 mx-5 p-4 mb-4 z-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {errorMessage}
</div> : <> </>
 }
        <div>
          { loadedTweets.length === 0 ? <NoTweets message={"Looks like no tweets have been made by any user. You can write your own tweets or wait for others to write something"}/>   : loadedTweets.map( (ele , index) =>  <TweetCard key={index} tag={ele.account.tag} author={ele.account.user.toBase58()} tweetKey={ele.publicKey.toBase58()} content={ele.account.content} /> )}
        </div></>
        }
    </div>
  )
}

export default HomeFeed
