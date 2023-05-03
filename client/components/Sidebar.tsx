import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import Home from '@/pages'

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center md:items-stretch space-y-2 md:space-y-4">

    <div className="flex flex-col items-center md:items-stretch space-y-2">
        <Link href="/home">
        <div className="rounded-full hover:bg-gray-100 hover:text-black p-3 md:w-full inline-flex items-center space-x-4" >

<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>
<div className="text-xl hidden md:block">Home</div>
</div>
        </Link>
       

        <Link href="/topics">
        <div className="rounded-full hover:bg-gray-100 hover:text-black p-3 md:w-full inline-flex items-center space-x-4" >

<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
</svg>
<div className="text-xl hidden md:block">Topics</div>
</div>
        </Link>

      
    <Link href="/users">
    <div  className="rounded-full hover:bg-gray-100 hover:text-black p-3 md:w-full inline-flex items-center space-x-4" >
        
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <div className="text-xl hidden md:block">Users</div>
    </div>
    </Link>

           <Link href="/chats">
           <div  className="rounded-full hover:bg-gray-100 hover:text-black p-3 md:w-full inline-flex items-center space-x-4" >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-8 w-8 text-white hover:text-black">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>


<div className="text-xl hidden md:block">Chats</div>
</div>
           </Link>
    <Link href="/profile">
    <div  className="rounded-full hover:bg-gray-100 hover:text-black p-3 md:w-full inline-flex items-center space-x-4" >

<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
<div className="text-xl hidden md:block">Profile</div>
</div>
    </Link>
    </div>
    <div className="fixed bottom-8 right-8 md:static w-48 md:w-full">
        <WalletMultiButton/>
    </div>
</div>
  )
}

export default Sidebar