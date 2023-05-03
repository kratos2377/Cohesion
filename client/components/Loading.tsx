import React from 'react'

const Loading = () => {
  return (
<div className="flex justify-center items-center">
  <div className="inline-flex">
    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-2.009a5.99 5.99 0 01-2-.342V17z"></path>
    </svg>
    <span>Loading...</span>
  </div>
</div>

  )
}

export default Loading