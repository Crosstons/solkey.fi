import React, {useState, useEffect} from 'react';
import { executeFlash, initFlash } from './backend/chain-calls';
import { getClusters } from './backend/basic';
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from '@solana/wallet-adapter-react';

let ListTitles = [];

function Flash() {
    const wallet = useAnchorWallet();

    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokenFlash, setTokenFlash] = useState(null);
    const [flashAddress, setFlashAddress] = useState(null);
    const [flashAmount, setFlashAmount] = useState(null);

    useEffect(() => {
        (async () => {
          const raw_data = await getClusters();
          for (const i in raw_data){
                const found = ListTitles.find(el => el.Address === raw_data[i]["Address"]);
                console.log(found);
                if(!found){
                    ListTitles.push(raw_data[i]);   
                }
        }
        setLoading(false);
        console.log(ListTitles);
        })();
      }, []);

    const onFlash = async() => {
        setLoading(true);
      //  const alertM = await initFlash(wallet, new anchor.web3.PublicKey(tokenFlash));
      //  alert(alertM);
        const alertMsg = await executeFlash(wallet, new anchor.web3.PublicKey(address), new anchor.web3.PublicKey(flashAddress), new anchor.web3.PublicKey(tokenFlash));
        alert(alertMsg);
        setLoading(false);
      }

  return (
    <div className="flex justify-center">

<div id="defaultModal" tabindex="-1" aria-hidden="true" class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        
        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">
          
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 class="text-lg font-semibold text-gray-900">
                    Loan Execution Form
                </h3>
            </div>
            <div>
                <div class="grid gap-4 mb-4 sm:grid-cols-1">
                    <div>
                        <label for="token-address" class="block mb-2 text-sm font-medium text-gray-900">Token Address</label>
                        <input  type="text" id="token-address" name='token-address' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="Token Address" onChange={(e) => setTokenFlash(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="flash-amount" class="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
                        <input type="number" min="1" name="flash-amount" id="flash-amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="1"  onChange={(e) => setFlashAmount(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="contract-address" class="block mb-2 text-sm font-medium text-gray-900">Contract Address</label>
                        <input type="text" id="contract-address" name='contract-address' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="Contract Address"  onChange={(e) => setFlashAddress(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Cluster</label>
                        <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" onChange={(e) => setAddress(e.target.value)}>
                            <option defaultValue disabled>
                            Select Cluster
                            </option>
                            {
                                ListTitles.map((cluster) => (<option value={cluster["Address"]}>{cluster["Name"]}</option>))
                            
                            }
                        </select>
                    </div>
                    <div class="sm:col-span-2">
                        </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onFlash}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg> {loading ? "Loading.." : "Execute"}
                </button>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Flash