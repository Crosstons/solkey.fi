import React from 'react'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useParams } from 'react-router-dom';
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from 'react';
import * as anchor from "@project-serum/anchor";
import { getVaultsOnChain, insureNFT } from './backend/chain-calls';
import { createVault } from './backend/chain-calls';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


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
            temp.push({addr : found.account.vmints[i].toBase58()});
        }
        setVmint(temp);
      }

      setImage(img);
      setLoading(false);
    })();
  }, [image]);




  return (
    <div>
        <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">

<div id="defaultModal" tabindex="-1" aria-hidden="true" class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">

            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 class="text-lg font-semibold text-gray-900 ">
                    NFT Address : {address}
                </h3>
            </div>
        { inited ? 
            <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-1">
                <span> Backed By Tokens - </span>
                    {vmint.map((tok) => (
                        <div>
                        <input type="text" id="disabled-input-2" aria-label="disabled input 2" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" value={tok.addr} disabled readonly/>
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
  )
}

export default Vault