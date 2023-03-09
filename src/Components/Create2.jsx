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
                    <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                   {loading ? "Loading..." : "Create" }
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