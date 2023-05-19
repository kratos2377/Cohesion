import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSlug } from '@/utils/useSlug'
import TweetCard from '@/components/TweetCard'
import Loading from '@/components/Loading'
import NoTweets from '@/components/NoTweets'
import { topicWiseTweets } from '@/rpc-calls/fetchTweets'
import { TweetType } from '@/types/TweetTypes'

const Topics = () => {
  const router = useRouter()
  const [tweets, setTweets] = useState<TweetType[]>([])
  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState(router.query.topic)
  const [viewedTopic, setViewedTopic] = useState(router.query.topic)
  const [searchText, setSearchText] = useState("");
  let ar = [1 , 2 ,3  , 4 ,5  , 6 , 7, 8]
  const slugTopic = useSlug(topic as string)

  // Actions.
  const search = () => {
    router.push(`/topics/${slugTopic}`)
    setViewedTopic(slugTopic)
  }

  const fetchTopicTweets = async () => {
    if (slugTopic === viewedTopic) {
      await topicWiseTweets(slugTopic)
        .then((fetchedTweets) => setTweets(fetchedTweets))
        .finally(() => setLoading(false))
    }
  }


  useEffect(() => {
   fetchTopicTweets()
  }, [])
  return (
    <div>
    <div className="text-2xl text-white m-5 mx-10">
    Topics
  </div>

 
<div className='mx-10 my-3'>
<form>   
<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
<div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </div>
    <input type="search" id="default-search" 
    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required
    value={slugTopic}
    onChange={(e) => setSearchText(e.target.value)}
    />
    <button type="submit" 
    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={search}
    >
      Search</button>
</div>
</form>
</div>


{
  loading ? <div className='mt-8'><Loading/></div> : <div>
  {tweets.length === 0 ? <NoTweets message={"You have not posted any tweets"}/>   : tweets.map( (ele) => <TweetCard  tweetKey={ele.publicKey.toBase58()} tag={ele.account.tag} author={ele.account.user.toBase58()} content={ele.account.content} /> )}
</div>
}

</div>
  )
}

export default Topics