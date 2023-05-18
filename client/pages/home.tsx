import Loading from '@/components/Loading'
import TweetCard from '@/components/TweetCard'
import { fetchTweets } from '@/rpc-calls/fetchTweets'
import React, { useEffect, useState } from 'react'

interface TweetType {
  topic: string,
  content: string,
  author: string
}

const HomeFeed = () => {

  const [loadingTweet , setLoading] = useState(true)
  const [loadedTweets , setLoadedTweets] = useState<TweetType[]>([])
  const [errorExists , setErrorExists] = useState(false)
  const [errorMessage , setErrorMessage] = useState("")

  
  const fetchAllTweets= async () => {
    const tweets = await fetchTweets();
    console.log(tweets)
    setLoadedTweets([...tweets])
  }


  useEffect(() => {
    fetchAllTweets().then(() => {
        setLoading(false)
    }).catch((err) => {

      console.log("Some error occured")
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
          {loadedTweets.map( (ele) =>  <TweetCard tag={"test"} author={'admasida7sd67aufbiuadshf89ad6fa76dtsfasdyufgylasdf7'} content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum, leo eu tincidunt euismod, nibh metus tristique metus, at scelerisque dolor magna et dui. Pellentesque tristique leo id neque lobortis, vel lobortis nisi efficitur. Sed id dui tincidunt, hendrerit nisl eu, aliquet massa. Donec molestie rutrum justo. Proin nulla neque, gravida scelerisque quam at, imperdiet dignissim arcu. Cras facilisis urna ut ante commodo, eget auctor arcu iaculis. Proin libero elit, luctus sit amet sapien ut, fringilla rhoncus elite\
  
  Ut tempus faucibus lacus vitae cursus. Nam hendrerit, risus vel tempor pulvinar, orci diam pulvinar diam, blandit semper turpis augue nec eros. Sed dignissim mi a dui semper, at scelerisque est tristique. Morbi orci metus, tempus quis consequat sit amet, dictum ut metus. Nam mattis sit amet dui eget facilisis. Cras et sagittis sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non leo eu odio pharetra semper sit amet eget justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur molestie massa non mauris vestibulum gravida.\
  
  Nam nec eros venenatis, tincidunt tellus vitae, elementum est. Duis mollis eros ac ligula maximus, quis ornare risus tincidunt. Mauris at eros lorem. Donec et risus mi. Fusce eget augue dictum, ultricies felis id, scelerisque sapien. Pellentesque ornare non velit eget mattis. Morbi nec sapien rutrum, euismod est ut, feugiat ligula. Vivamus pretium lacus risus, et convallis dui eleifend ut. Nulla in nibh lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec finibus mauris nec quam vulputate, eget maximus urna ultricies. Curabitur eu turpis rhoncus, fermentum nunc a, pellentesque metus.\
  
  Phasellus sagittis non lectus ut aliquet. Praesent facilisis nisl et odio pellentesque, in accumsan nunc malesuada. Quisque dapibus volutpat risus in finibus. Vivamus pretium ac leo eu mattis. Curabitur nibh ipsum, pretium nec magna quis, luctus volutpat mi. Donec nunc arcu, feugiat a vulputate quis, facilisis quis nunc. Morbi consectetur urna a facilisis consequat. Vivamus eget placerat sem.\
  
  Vivamus tincidunt dolor at turpis mattis cursus. Aliquam erat volutpat. Phasellus a magna ante. Quisque sed nibh vulputate, volutpat tortor id, ultrices turpis. Sed eu nisi interdum, aliquet elit quis, sagittis metus. Vivamus ornare enim ut volutpat luctus. Suspendisse potenti. Morbi porta lorem vel mi scelerisque, vitae egestas erat maximus. Maecenas varius, tellus ac mollis pharetra, felis metus venenatis sapien, et placerat diam lectus a nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In eleifend, orci nec vestibulum auctor, erat enim volutpat urna, quis eleifend elit nibh vel nibh. In id elit in lectus tristique aliquam ac condimentum orci. Aliquam tincidunt velit et congue pellentesque. Donec sodales fringilla euismod`} commentCount={23} likeCount={12} /> )}
        </div></>
        }
    </div>
  )
}

export default HomeFeed
