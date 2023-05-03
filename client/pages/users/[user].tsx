import Loading from '@/components/Loading';
import TweetCard from '@/components/TweetCard';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const User = () => {
  const [loading , setLoading] = useState(true);

  const router = useRouter()
  const [userAddress , setUserAddress] = useState(router.query.user)
  let ar = [1, 2]

  useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      } , 2000)
  } , [])

  return (
    <div>

    <div className="text-2xl text-white m-5 mx-10">
     {userAddress} Posts
          </div>
    
   
    
    <div className='mx-8 my-3'>
    {
      loading ? <div className='mt-8'><Loading/> </div> :  <div > 
     {ar.map( (ele) =>  <TweetCard author={'admasida7sd67aufbiuadshf89ad6fa76dtsfasdyufgylasdf7'} content={"ASDSADUUDASHDUHASDHGASDHISADHSAHDHDHISAD"} commentCount={23} likeCount={12} /> )}
     </div>
     }
    </div>
    
        </div>
  )
}

export default User