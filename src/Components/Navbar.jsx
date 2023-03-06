import React from 'react'
import List from './List';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
function Navbar() {
  return (
    <div className="flex">
        <div class="p-4 sm:ml-64 ">
         
         </div>
         
         
           <div class="flex flex-col flex-grow p-6 w-full">
             <div class="flex items-center justify-between bg-white py-4 px-6 border-b">
               <div class="flex items-center">
                 <button class="text-gray-600 focus:outline-none md:hidden">
                   <svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                 </button>
                 <h1 class="text-lg font-medium ml-4">Browse Clustors</h1>
               </div>
               <div class="flex items-center">
                 <button class=" text-white px-4 py-2 rounded-md mr-4">
                  <WalletMultiButton />
                 </button>
                 <div class="relative">
                   <button class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                     <img class="h-8 w-8 rounded-full object-cover" src="https://source.unsplash.com/user/erondu/1600x900" alt="Your avatar"/>
                   </button>
                   <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                   </div>
                 </div>
               </div>
            
             </div>
             
           </div>
    </div>
  )
}

export default Navbar;