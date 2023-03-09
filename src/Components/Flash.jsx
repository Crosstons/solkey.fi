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
                            <option defaultValue disabled selected>
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
                {loading ? "" : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>} 
                            {loading ? 
                              <span>               <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                              </svg>
                              Loading
                            </span>   
                            : "Execute"}
                </button>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Flash