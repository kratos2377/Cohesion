import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';

type LayoutProps = {
  children: React.ReactNode;
};


const Layout = ({children}: LayoutProps) => {

  return (
<div className="w-full mx-auto">

  
        <div className="py-4 md:py-8 md:pl-4 md:pr-8 fixed w-20 md:w-64">
           <Sidebar />
         </div>
     
      
         <main className="flex-1 border-r border-l ml-20 md:ml-64 min-h-screen">
     
             {children}
     
         </main>
     
     
     </div>
    
    
  )
}

export default Layout