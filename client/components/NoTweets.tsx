import React from 'react'


interface Props {
    message: String
}

const NoTweets = ({message} : Props) => {
  return (
    <div>{message}</div>
  )
}

export default NoTweets