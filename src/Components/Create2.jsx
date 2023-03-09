import React, {useState, useEffect} from 'react';
import { initOffer } from './backend/chain-calls';
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from '@solana/wallet-adapter-react';

function Create2() {

    const wallet = useAnchorWallet();

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [price, setPrice] = useState(1);
    const [total, setTotal] = useState(1);

    const onSubmit = async () => {
        setLoading(true);
        console.log(token,price,total);
        try{
            setToken(new anchor.web3.PublicKey(token));
            setPrice(new anchor.BN(price));
            setTotal(new anchor.BN(total));

            await initOffer(wallet, token, price, total);

        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

  return (
    <div>
        <div id="updateProductModal" tabindex="-1" aria-hidden="true" class=" justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">

        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">

            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 class="text-lg font-semibold text-gray-900">
                    Offer Creation Form
                </h3>
            </div>

            <div>
                <div class="grid gap-4 mb-4 sm:grid-cols-1">
                    <div>
                        <label for="token" class="block mb-2 text-sm font-medium text-gray-900">Token Address</label>
                        <input type="text" name="token" id="token" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 " placeholder="Enter Token Address" onChange={(e) => setToken(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Price in Lamports</label>
                        <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="Enter Price of Each Token" onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="total" class="block mb-2 text-sm font-medium text-gray-900">Total Tokens with Decimals</label>
                        <input type="number" name="total" id="total" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="Enter The Total Number of Tokens" onChange={(e) => setTotal(e.target.value)} required/>
                    </div>
                    
                </div>
                <div class="flex items-center space-x-4">
                <button type="submit" class="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onSubmit}>
                    { loading ? "" : <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>}
                   {loading ? 
                                  <span>               <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                  </svg>
                                  Loading
                                </span>  
                    : "Create" }
                </button>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Create2