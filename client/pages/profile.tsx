import Loading from '@/components/Loading';
import TweetCard from '@/components/TweetCard';
import WriteTweetArea from '@/components/WriteTweetArea';
import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [errorExists , setErrorExists] = useState(false)
  const [errorMessage , setErrorMessage] = useState("")
  const [loading , setLoading] = useState(true);
  let ar = [1 , 2]

  useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      } , 2000)
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
Your Posts
      </div>

      { errorExists ? <div className="w-100 mx-5 p-4 mb-4 z-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {errorMessage}
</div> : <> </>
 }
      <div className='mx-10 my-3'>
    <WriteTweetArea/>
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