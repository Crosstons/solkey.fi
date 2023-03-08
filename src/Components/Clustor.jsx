import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import * as anchor from "@project-serum/anchor";
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
                     <svg aria-hidden="true" class="w-6 h-6 text-purple-500 transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                     <span class="ml-3 text-bold text-2xl">Solkey.fi</span>
                  </a>
               </li>
               <li>
                  <Link to={"/"} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100">
                     <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                     <span class=" ml-3 whitespace-nowrap">Browse Clusters</span>
                  </Link>
               </li>
               <li>
                  <Link to={"/"} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100">
                     <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                     <span class=" ml-3 whitespace-nowrap">Create Cluster</span>
                  </Link>
               </li>
               <li>
                  <Link to={"/"} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100 ">
                     <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                     <span class=" ml-3 whitespace-nowrap">Flash Loans</span>
                  </Link>
               </li>
               <li>
                  <Link to={"/"} class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-purple-100">
                     <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                     <span class=" ml-3 whitespace-nowrap">Offers</span>
                  </Link>
               </li>
            </ul>
            <ul class="pt-4 mt-4 space-y-2 border-t border-gray-200">
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-purple-100 ">
                     <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" focusable="false" data-prefix="fas" data-icon="gem" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"></path></svg>
                     <span class="ml-4">Ovah</span>
                  </a>
               </li>
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-purple-100">
                     <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
                     <span class="ml-3">Ovah</span>
                  </a>
               </li>
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-purple-100">
                     <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                     <span class="ml-3">Ovah</span>
                  </a>
               </li>
               <li>
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-purple-100">
                     <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path></svg>
                     <span class="ml-3">Help</span>
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
                  Cluster Interactions
              </h1>
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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
      Faucet
    </button>
    <button
      type="button"
      class="inline-block bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onTokenAccounts}
      >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>      
      Accs
    </button>
    <button
      type="button"
      class="inline-block bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onIssue}
      >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
      Issue
    </button>
    <button
      type="button"
      class="inline-block rounded-r bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={onRedeem}
      >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-1">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
      Redeem
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