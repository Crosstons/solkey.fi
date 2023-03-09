import React, {useState, useEffect} from 'react'
import { getOffersOnChain } from './backend/chain-calls';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { acceptOffer } from './backend/chain-calls';
import * as anchor from "@project-serum/anchor";

let ListTitles = [];

function Offers() {

  const wallet = useAnchorWallet();

  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [offer, setOffer] = useState("");
  const [seller, setSeller] = useState("");
  const [mint, setMint] = useState("");

  const handleInfoChange = async (event) => {
    setOffer(event.currentTarget.dataset.key);
    setSeller(event.currentTarget.dataset.seller);
    setMint(event.currentTarget.dataset.mint);

   await onSubmit(offer, seller, mint);
  }

  const onSubmit = async (offer, seller, mint) => {
    setLoading(true);
    console.log(offer);
    console.log(seller);
    console.log(mint);
    try{
    await acceptOffer(wallet, new anchor.web3.PublicKey(offer), new anchor.web3.PublicKey(seller), new anchor.web3.PublicKey(mint), new anchor.BN(amount));
      console.log("Offer Accepted");
    } catch(error) {
      console.log(error);
      alert(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const raw_data = await getOffersOnChain(wallet);
      for (const i in raw_data){
        console.log(raw_data[i].publicKey.toBase58());
          if(ListTitles.length < 6 && raw_data[i].account.totalTokens.toNumber() !== 0){
            const found = ListTitles.find(el => el.seller === raw_data[i].account.seller.toBase58());
          //  console.log(found);
            if(!found){
              ListTitles.push({ 
                publickey : raw_data[i].publicKey.toBase58(),
                mint : raw_data[i].account.mint.toBase58(), 
                seller : raw_data[i].account.seller.toBase58(),
                price : raw_data[i].account.price.toNumber(),
                total_tokens : raw_data[i].account.totalTokens.toNumber()
              })
            }
          }
        }
    
    setLoading(false);
    console.log(ListTitles);
    })();
  }, []);

  return (
    <div>
        <section class="text-gray-600">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Offers</h1>
      <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">All the available token offers are listed below :  <br /> <span> The values are below are with decimals so calculate accordingly* </span></p>
    </div>
    <div class="flex flex-wrap -m-4">
    { ListTitles.map((offer) => (
      <div class="xl:w-1/3 md:w-1/2 p-4">
        <div class="border border-gray-200 p-6 rounded-lg bg-white">
          <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>

          </div>
          <h2 class="text-xl text-gray-900 font-medium title-font mb-2">{offer.mint.slice(0,7)}.. @ {offer.price} LAMPS</h2>
          <p class="leading-relaxed text-xl font-semibold mb-2">Av. {offer.total_tokens}</p>
          <p class="leading-relaxed text-base mb-2">Seller : {offer.seller.slice(0,7)}..</p>
          <label for="amount-one" class="block mb-2 text-sm font-medium text-gray-900 ">Amount</label>
            <input type="number" min="1" value={amount} name="amount-one" id="amount-one" onChange={(e) => setAmount(e.target.value)} class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5" placeholder="1" required/>
          <button data-key={offer.publickey} data-seller={offer.seller} data-mint={offer.mint} class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" onClick={handleInfoChange} >
          <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
            { loading ? "Loading" : "Buy"}
          </button>
        </div>
      </div>
      ))
    }
    </div>
    </div>
</section>
    </div>
  )
}

export default Offers