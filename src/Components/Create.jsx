import React, {useState} from 'react';
import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { createCluster } from './backend/chain-calls';

function Create() {

    const wallet = useAnchorWallet();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [keyOne, setKeyOne] = useState("");
    const [keyTwo, setKeyTwo] = useState("");
    const [keyThree, setKeyThree] = useState("");
    const [oneAmt, setOneAmt] = useState(0);
    const [twoAmt, setTwoAmt] = useState(0);
    const [threeAmt, setThreeAmt] = useState(0);

    const onSubmit = async() => {
        setLoading(true);
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
        setLoading(false);
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
                    {loading ? "" : <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>}
                    { loading ? 
                                  <span>               <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                  </svg>
                                  Loading
                                </span>  
                    : "Create"}
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