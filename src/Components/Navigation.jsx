import React, { useState, useEffect } from 'react'
import List from './List';
import Flash from './Flash';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Create from './Create';
import Create2 from './Create2';
import Clustor from './Clustor';
import Offers from './Offers';
import Vault from './Vault';
import Keyvault from './Keyvault';
import logo from  '../logo/logo.png';

function Navigation() {

   const [browse, setBrowse] = useState(true);
   const [create, setCreate] = useState(false);
   const [flash, setFlash] = useState(false);
   const [offers, setOffers] = useState(false);
   const [createOffer, setCreateOffer] = useState(false);
   const [key, setKey] = useState(false);

   const onBrowse = () => {
      setBrowse(true);
      setCreate(false);
      setFlash(false);
      setOffers(false);
      setCreateOffer(false);
      setKey(false);
   }

   const onCreate = () => {
      setBrowse(false);
      setCreate(true);
      setFlash(false);
      setOffers(false);
      setCreateOffer(false);
      setKey(false);
   }

   const onFlash = () => {
      setBrowse(false);
      setCreate(false);
      setFlash(true);
      setOffers(false);
      setCreateOffer(false);
      setKey(false);
   }

   const onOffers = () => {
      setBrowse(false);
      setCreate(false);
      setFlash(false);
      setOffers(true); 
      setCreateOffer(false);
      setKey(false);     
   }

   const onCreateOffers = () => {
      setBrowse(false);
      setCreate(false);
      setFlash(false);
      setOffers(false); 
      setCreateOffer(true);  
      setKey(false);      
   }

   const onKey = () => {
      setBrowse(false);
      setCreate(false);
      setFlash(false);
      setOffers(false); 
      setCreateOffer(false);  
      setKey(true);        
   }

  return (
    <div>
        <div class="flex h-screen bg-gray-200">
      
      <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
         <span class="sr-only">Open sidebar</span>
         <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
         </svg>
      </button>
      
      <aside id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
         <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
            <ul class="space-y-2">
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100 ">
                  <img class="h-8 w-8 object-cover" src={logo} alt="Your avatar"/>
                     <span class="ml-3 text-bold text-2xl">Solkey.fi</span>
                  </a>
               </li>
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100 " onClick={onBrowse}>
                  <svg xmlns="http://www.w3.org/2000/svg" class=" hover:text-purple-500 flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                     <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>


                     <span class=" ml-3 whitespace-nowrap">Browse Clusters</span>
                  </a>
               </li>
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100" onClick={onCreate}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                  </svg>

                     <span class=" ml-3 whitespace-nowrap">Create Cluster</span>
                  </a>
               </li>
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100 " onClick={onFlash}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>

                     <span class=" ml-3 whitespace-nowrap">Flash Loans</span>
                  </a>
               </li>
               
            </ul>
            <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200">
            <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100" onClick={onOffers}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                     <span class=" ml-3 whitespace-nowrap">Offers</span>
                  </a>
               </li>
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-purple-100" onClick={onCreateOffers}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                     <span class="ml-3">Create Offer</span>
                  </a>
               </li>
            </ul>
            <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200">

               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-purple-100" onClick={onKey}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                  </svg>

                     <span class="ml-4">Insurance</span>
                  </a>
               </li>
            </ul>
         </div>
      </aside>
      
      <div class="p-4 sm:ml-64 ">
         
      </div>
      
      
        <div class="flex flex-col flex-grow p-6 w-full">
          <div class="flex items-center justify-between bg-white py-4 px-6 border-b">
            <div class="flex items-center">
              <button class="text-gray-600 focus:outline-none md:hidden">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              <h1 class="text-lg font-medium ml-4">
                  { browse ? "Browse Clusters" : ""}
                  {create ? "Create Cluster" : ""}
                  {flash ? "Flash Loan" : ""}
                  {offers ? "Marketplace" : ""}
                  {createOffer ? "Create Offer" : ""}
                  {key ? "NFT Keysurance" : ""}
              </h1>
            </div>
            <div class="flex items-center">
              <button class=" text-white px-4 py-2 rounded-md mr-4">
               <WalletMultiButton />
              </button>
              <div class="relative">
                <button class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  <img class="h-8 w-8 object-cover" src={logo} alt="Your avatar"/>
                </button>
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                </div>
              </div>
            </div>
          </div>
          { browse ? <List /> : ""}
          { create ? <Create /> : ""}
          { flash ? <Flash /> : ""}
          { offers ? <Offers /> : ""}
          { createOffer ? <Create2 /> : ""}
          { key ? <Keyvault /> : "" }
        </div>
        
      </div>
      
    </div>
   

    
  )
}

export default Navigation;