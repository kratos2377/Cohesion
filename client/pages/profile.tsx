import Loading from '@/components/Loading';
import TweetCard from '@/components/TweetCard';
import WriteTweetArea from '@/components/WriteTweetArea';
import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [hover, setHover] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading , setLoading] = useState(true);

  let ar = [1 , 2]

  useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      } , 2000)
  }, [])
  
  return (
    <div>

<div className="text-2xl text-white m-5 mx-10">
Your Posts
      </div>

      <div className='mx-10 my-3'>
    <WriteTweetArea/>
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

export default Profile