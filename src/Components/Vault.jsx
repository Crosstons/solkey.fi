import React from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useParams } from 'react-router-dom';
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from 'react';
import * as anchor from "@project-serum/anchor";
import { getVaultsOnChain, insureNFT } from './backend/chain-calls';
import { createVault } from './backend/chain-calls';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { DateTimePicker } from '@mui/x-date-pickers';
import { getTokenBalance } from './backend/chain-calls';
import dayjs from 'dayjs';
import logo from  '../logo/logo.png';
import { Link } from 'react-router-dom';


function Vault() {

  const wallet = useAnchorWallet();

  const {address} = useParams();

  const connection = new Connection(clusterApiUrl("devnet"));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(false);
  const [vault, setVault] = useState(null);
  const [vmint, setVmint] = useState([]);
  const [inited, setInited] = useState(false);
  const [date, setDate] = useState(null);
  const [addAddress, setAddAddress] = useState(null);
  const [addAmount, setAddAmount] = useState(null);


  const fetchImage = async (a) => {
    const addr = new PublicKey(a);  
    const nft = await metaplex.nfts().findByMint({ mintAddress : addr });
    return nft.json.image;
  }

  const onInit = async () => {
    setLoading(true);
    try{
        await createVault(wallet, new anchor.BN(dayjs().unix().valueOf(date)), new anchor.web3.PublicKey(address));
    } catch(error){
        console.log(error);
        alert(error);
    }
    setLoading(false);
  }

  const onAddInsurance = async () => {
    setLoading(true);
    try{
        await insureNFT(wallet,new anchor.web3.PublicKey(vault), address, new anchor.web3.PublicKey(addAddress), new anchor.BN(addAmount));
    } catch(error){
        console.log(error);
        alert(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const img = await fetchImage(address);

      const raw_vaults = await getVaultsOnChain(wallet);
      console.log(raw_vaults);
      const found = raw_vaults.find(el => el.account.nftMint.toBase58() === address);
      if(!found){
        setInited(false);
      }
      else{
        setInited(true);
        setVault(found.publicKey.toBase58());
        let temp = [];
        for(const i in found.account.vmints){
            const amt = await getTokenBalance(wallet, new anchor.web3.PublicKey(found.publicKey.toBase58()), new anchor.web3.PublicKey(found.account.vmints[i].toBase58()));
            temp.push({addr : found.account.vmints[i].toBase58(), amount : amt});
        }
        setVmint(temp);
      }

      setImage(img);
      setLoading(false);
    })();
  }, [image]);




  return (
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
                  {loading ? "Loading..." : "Vault Interaction"}
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
<section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">

<div id="defaultModal" tabindex="-1" aria-hidden="true" class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">

            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 class="text-lg font-semibold text-gray-900 ">
                    NFT Address : {address.slice(0,25)}..
                </h3>
            </div>
        { inited ? 
            <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-1">
                <span> Backed By Tokens - </span>
                    {vmint.map((tok) => (
                        <div>
                        <input type="text" id="disabled-input-2" aria-label="disabled input 2" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" value={tok.addr.slice(0,10) + "..  -  " + tok.amount } disabled readonly/>
                        </div>
                    ))}

                </div>
            </form>
            : ""}
        </div>
    </div>
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        { inited ?
        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">

            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 class="text-lg font-semibold text-gray-900 ">
                    Add Insurance Form
                </h3>
            </div>
            <div>
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Token Addr.</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" onChange={(e) => setAddAddress(e.target.value)} placeholder='Token Address' required=""/>
                    </div>
                    <div>
                        <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input type="number" min="1" name="amount" id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" onChange={(e) => setAddAmount(e.target.value)} placeholder="1" required/>
                    </div>
                    
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onAddInsurance}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </div>
        </div>
         : 
         <div>
         <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
         <h3 class="text-lg font-semibold text-gray-900 ">
             Vault Creation Form
         </h3>
        </div> 
         <div class="grid gap-4 mb-4 sm:grid-cols-2">
                 <div>
                     
                     <DateTimePicker
                        label="Unlock Time"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        />
                 </div>
                 
             </div>
             <button type="submit" class="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onInit}>
                 Initialize
             </button>
         </div>
        }
    </div>
</div>
</div>

      </div>
      <img class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={image}/>
      
    </div>
  </div>
</section>
</div>
    </div>
  )
}

export default Vault