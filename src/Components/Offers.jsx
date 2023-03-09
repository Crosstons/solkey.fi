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
          {loading ? "" : <svg aria-hidden="true" class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>}
            { loading ?
              <span>               <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Loading
              </span>  
            : "Buy"}
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
{/* <button disabled type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center">

</button> */}