import React, {useState} from 'react';
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { createCluster } from './backend/chain-calls';

function Create() {

    const wallet = useAnchorWallet();

    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [keyOne, setKeyOne] = useState("");
    const [keyTwo, setKeyTwo] = useState("");
    const [keyThree, setKeyThree] = useState("");
    const [oneAmt, setOneAmt] = useState(0);
    const [twoAmt, setTwoAmt] = useState(0);
    const [threeAmt, setThreeAmt] = useState(0);

    const onSubmit = async() => {
        console.log(keyOne, keyTwo, keyThree);
        try{
            setKeyOne(new anchor.web3.PublicKey(keyOne));
            setKeyTwo(new anchor.web3.PublicKey(keyTwo));
            setKeyThree(new anchor.web3.PublicKey(keyThree));
            try{
            await createCluster(wallet, name, symbol, keyOne, keyTwo, keyThree, new anchor.BN(oneAmt), new anchor.BN(twoAmt), new anchor.BN(threeAmt));
            console.log("Cluster Created");
            }
            catch(error){
                console.log(error)
            }
        } catch(error){
            console.log(error);
            alert(error);
        }
    }

  return (
    <section className=''>  
<div className="flex justify-center">
<div class="flex justify-center m-5">
</div>

<div tabindex="-1" aria-hidden="true" class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">

        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">

            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 class="text-lg font-semibold text-gray-900">
                    Creation Form
                </h3>
            </div>

            <div>
                
                <div class="grid gap-4 mb-4 sm:grid-cols-1">
                <div>
                        <label for="Name" class="block mb-2 text-sm font-medium text-gray-900">Enter Name</label>
                        <input type="text" name="Name" id="Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 " placeholder="Give Cluster a Name" onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                        <label for="Symbol" class="block mb-2 text-sm font-medium text-gray-900">Symbol</label>
                        <input type="text" name="Symbol" id="Symbol" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="Give Cluster a Symbol" onChange={(e) => setSymbol(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="KeyOne" class="block mb-2 text-sm font-medium text-gray-900">Token - 1</label>
                        <input type="text" name="KeyOne" id="KeyOne" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 " placeholder="Enter Token Address" onChange={(e) => setKeyOne(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="amount-one" class="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
                        <input type="number" min="1" value={oneAmt} name="amount-one" id="amount-one" onChange={(e) => setOneAmt(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="1" required/>
                    </div>
                    <div>
                        <label for="KeyTwo" class="block mb-2 text-sm font-medium text-gray-900">Token - 2</label>
                        <input type="text" name="KeyTwo" id="KeyTwo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 " placeholder="Enter Token Address" onChange={(e) => setKeyTwo(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="amount-two" class="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                        <input type="number" min="1" value={twoAmt} name="amount-two" id="amount-two" onChange={(e) => setTwoAmt(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="1" required/>
                    </div>
                    <div>
                        <label for="KeyThree" class="block mb-2 text-sm font-medium text-gray-900">Token - 3</label>
                        <input type="text" name="KeyThree" id="KeyThree" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 " placeholder="Enter Token Address" onChange={(e) => setKeyThree(e.target.value)} required/>
                    </div>
                    <div>
                        <label for="amount-three" class="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                        <input type="number" min="1" value={threeAmt} name="amount-three" id="amount-three" onChange={(e) => setThreeAmt(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="1" required/>
                    </div>
                    <div class="sm:col-span-2">
                        </div>
                </div>
                <button type="submit" class="text-white inline-flex items-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={onSubmit}>
                    <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Create
                </button>
            </div>
        </div>
    </div>
</div>
    </div>
    </section>
  )
}

export default Create