import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import * as anchor from "@project-serum/anchor";
import logo from  '../logo/logo.png';
import { getClustersOnChain, initCluster, faucetTestTokens, issueCluster, createTokenAccounts, redeemCluster } from './backend/chain-calls';

function Clustor() {

  const wallet = useAnchorWallet();

  const {address} = useParams();
  const [loading, setLoading] = useState(true);
  const [clusterStatus, setClusterStatus] = useState(false);
  const [amount, setAmount] = useState(1);
  const [clustorName, setClustorName] = useState("");
  const [clustorSupply, setClustorSupply] = useState(0);
  const [tokenKeyOne, setTokenKeyOne] = useState(null);
  const [tokenKeyTwo, setTokenKeyTwo] = useState(null);
  const [tokenKeyThree, setTokenKeyThree] = useState(null);
  const [tokenOneAmt, setTokenOneAmt] = useState(0);
  const [tokenTwoAmt, setTokenTwoAmt] = useState(0);
  const [tokenThreeAmt, setTokenThreeAmt] = useState(0);

  useEffect(() => {
    (async () => {
      const i = await getClustersOnChain(wallet);
      let x = i.find(el => el.publicKey.toBase58() === address);
      console.log(x);
      setClusterStatus(x.account.inited);
      setClustorName(x.account.clusterName);
      setClustorSupply(x.account.clusterSupply.toNumber());
      setTokenKeyOne(new anchor.web3.PublicKey(x.account.tokenOne.toBase58()));
      setTokenKeyTwo(new anchor.web3.PublicKey(x.account.tokenTwo.toBase58()));
      setTokenKeyThree(new anchor.web3.PublicKey(x.account.tokenThree.toBase58()));
      setTokenOneAmt(x.account.t1Amt.toNumber());
      setTokenTwoAmt(x.account.t2Amt.toNumber());
      setTokenThreeAmt(x.account.t3Amt.toNumber());
      setLoading(false);
    })();
  }, []);

  const initialize = async() => {
    setLoading(true);
      const alertMsg = await initCluster(wallet, new anchor.web3.PublicKey(address), tokenKeyOne, tokenKeyTwo, tokenKeyThree);
      alert(alertMsg);
    setLoading(false);
  }

  const onFaucet = async() =>{
    setLoading(true);
    const alertMsg = await faucetTestTokens(wallet, tokenKeyOne, tokenKeyTwo, tokenKeyThree);
    alert(alertMsg);
    setLoading(false);
  }

  const onIssue = async() => {
    setLoading(true);
    const alertMsg = await issueCluster(wallet, new anchor.web3.PublicKey(address), amount, tokenKeyOne, tokenKeyTwo, tokenKeyThree);
    alert(alertMsg);
    setLoading(false);
  }

  const onTokenAccounts = async() => {
    setLoading(true);
    const alertMsg = await createTokenAccounts(wallet, new anchor.web3.PublicKey(address), tokenKeyOne, tokenKeyTwo, tokenKeyThree);
    alert(alertMsg);
    setLoading(false);
  }

  const onRedeem = async() => {
    setLoading(true);
    const alertMsg = await redeemCluster(wallet, new anchor.web3.PublicKey(address), amount, tokenKeyOne, tokenKeyTwo, tokenKeyThree);
    alert(alertMsg);
    setLoading(false);
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
                  <Link to='/home/' class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100 ">
                  <svg xmlns="http://www.w3.org/2000/svg" class=" hover:text-purple-500 flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                     <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                     <span class=" ml-3 whitespace-nowrap">Browse Clusters</span>
                  </Link>
               </li>
               <li>
                  <Link to='/home/' class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                  </svg>

                     <span class=" ml-3 whitespace-nowrap">Create Cluster</span>
                  </Link>
               </li>
               <li>
                  <Link to='/home/' class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100 ">
                  <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>

                     <span class=" ml-3 whitespace-nowrap">Flash Loans</span>
                  </Link>
               </li>
               
            </ul>
            <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200">
            <li>
                  <Link to='/home/' class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                     <span class=" ml-3 whitespace-nowrap">Offers</span>
                  </Link>
               </li>
               <li>
                  <Link to='/home/' class="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                     <span class="ml-3">Create Offer</span>
                  </Link>
               </li>
            </ul>
            <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200">

               <li>
                  <Link to='/home/' class="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 hover:text-purple-500">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                  </svg>

                     <span class="ml-4">Insurance</span>
                  </Link>
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
                  Cluster Interaction
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
          <div>
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              { clusterStatus ? 
              <div>
                <h1 class="text-lg font-semibold text-gray-900">
                   Name : {clustorName}
                </h1>
                <h5 class="text-sm font-medium text-gray-600">
                  Cluster Supply : {clustorSupply}
                </h5>
              </div>
              : 
                <button className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-[#ffffff] rounded-lg border border-[#e2e8f0] hover:bg-[#f1f5f9] hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-[#4b5563] dark:hover:text-[#ffffff] dark:hover:bg-[#374151] inline-flex items-center" onClick={initialize}>{loading ? "Loading...":"Initialize"}
                </button>
              }
            </div>

            <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-1">

                    <div>
                        <label for="name" class="block mb-2 text-lg font-medium text-gray-900">Token List</label>
                        <input type="text" id="disabled-input" aria-label="disabled input" class=" bg-gray-100 border border-gray-300 text-gray-900 text-md mb-6 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={tokenKeyOne + " : " + tokenOneAmt } disabled/>
                        <input type="text" id="disabled-input" aria-label="disabled input" class=" bg-gray-100 border border-gray-300 text-gray-900 text-md mb-6 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={tokenKeyTwo + " : " + tokenTwoAmt } disabled/>
                        <input type="text" id="disabled-input" aria-label="disabled input" class=" bg-gray-100 border border-gray-300 text-gray-900 text-md mb-6 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={tokenKeyThree + " : " + tokenThreeAmt } disabled/>
                    </div>
                    <div className="">
                        <div className="flex justify-start">
                        <label for="price" class="block mb-2 ml-2 text-sm font-medium text-gray-900">Amount</label>
                        </div>
                        <input type="number" min="1" value={amount} name="input-amount" id="input-amount" class="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block item-center p-2.5" onChange={(e) => setAmount(e.target.value)} required=""/>
                    </div>
                   
                </div>
                <div class="flex items-center justify-center">
  <div
    class="inline-flex shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
    role="group">
    <button
      type="button"
      class="inline-block rounded-l bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onFaucet}
      >
    {loading ? "" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg> }
      { loading ?               <span>               <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading
              </span>   : "Faucet"}
    </button>
    <button
      type="button"
      class="inline-block bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onTokenAccounts}
      >
    { loading ? "" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg> }     
      { loading ?               <span>               <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading
              </span>   : "Accs"}
    </button>
    <button
      type="button"
      class="inline-block bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onIssue}
      >
    { loading ? "" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg> }
      {loading ?               <span>               <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading
              </span>   : "Issue"}
    </button>
    <button
      type="button"
      class="inline-block rounded-r bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onRedeem}
      >
    { loading ? "" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>}
      { loading ?               <span>               <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading
              </span>   :"Redeem"}
    </button>
  </div>
</div>
            </form>
        </div>
    </div>
</div>
    </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Clustor