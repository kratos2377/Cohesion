import React from 'react'


interface Props {
    message: String
}

const NoTweets = ({message} : Props) => {
  return (
    <div className='m-5'>{message}</div>
  )
}

export default NoTweets