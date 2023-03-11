import React, {useEffect, useState} from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getVaultsOnChain } from './backend/chain-calls';
import * as anchor from "@project-serum/anchor";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

function Keyvault() {

  const [ListTitles, setList] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  const wallet = useAnchorWallet();
  const connection = new Connection(clusterApiUrl("devnet"));
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage());

  const fetchNFTData = async (address) => {
    const addr = new anchor.web3.PublicKey(address);  
    const nft = await metaplex.nfts().findByMint({ mintAddress : addr });
    return [nft.name, nft.symbol, nft.json.image];
  }

    useEffect(() => {
      (async () => {
        const nfts = await metaplex.nfts().findAllByOwner({owner : wallet.publicKey});
        let temp1 = [];
        for(const i in nfts){
          const found = temp1.find(el => el.address === nfts[i].mintAddress.toBase58());
          if(!found){
          const j = await fetchNFTData(nfts[i].mintAddress.toBase58());
          temp1.push({
              address : nfts[i].mintAddress.toBase58(),
              name : nfts[i].name,
              symbol : nfts[i].symbol,
              price : nfts[i].sellerFeeBasisPoints,
              imageURI : j[2],
          });
        }
        }

        const raw_vaults = await getVaultsOnChain(wallet);
        let temp = [];
        for(const i in raw_vaults){
          const found = temp.find(el => el.nft === raw_vaults[i].account.nftMint.toBase58());
          if(!found && raw_vaults[i].publicKey.toBase58() !== "5yz3LXDMGLLmSnjGQcGVzGsT6o8zJF71zCCA5WuWQ4xS"){
            try{
              const j = await fetchNFTData(raw_vaults[i].account.nftMint.toBase58());
              temp.push({
                vault : raw_vaults[i].publicKey.toBase58(), 
                nft : raw_vaults[i].account.nftMint.toBase58(), 
                unlockTime : dayjs.unix(raw_vaults[i].account.unlockTime.toString()).format('lll'), 
                mints : raw_vaults[i].account.vmints,
                name : j[0],
                symbol : j[1],
                imageURI : j[2],
            });
            }
            catch(error){
              console.log(error)
            }
          }
        }
        setList(temp);
        setHoldings(temp1);
        setLoading(false);
      })();
    }, []);

  return (
    <div>
        <section class="text-gray-600 body-font">
  <div class="container px-5 py-12 mx-auto">
  <h1 class="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-10">{loading ? "Loading..." : "My NFTs"}</h1>
    <div class="flex flex-wrap -m-4">
      { holdings.map((token) => (
      <div class="lg:w-1/5 md:w-1/2 p-4 w-full" key={token.address}>
        <a class="block relative h-48 rounded overflow-hidden">
          <img class="object-cover object-center w-full h-full block" src={token.imageURI}/>
        </a>
        <div class="mt-4">
          <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{token.symbol}</h3>
          <h2 class="text-gray-900 title-font text-lg font-medium">{token.name}</h2>
          <p class="mt-1">{token.price} LAMPs</p> <br />
          <Link to={`/vaults/${token.address}/`} class="mt-2 px-3 py-2 text-xs font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300">Interact</Link>
        </div>
      </div>
      ))}
      </div>
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 my-10">Insured NFTs</h1>
      <div class="flex flex-wrap -m-4">
        { ListTitles.map((vault) => (
        
        <Link to={`/vaults/${vault.nft}/`} class="lg:w-1/5 md:w-1/2 p-4 w-full" key={vault.vault}>
          <a class="block relative h-48 rounded overflow-hidden">
            <img class="object-cover object-center w-full h-full block" src={vault.imageURI} />
          </a>
          <div class="mt-4">
            <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{vault.symbol}</h3>
            <h2 class="text-gray-900 title-font text-lg font-medium">{vault.name}</h2>
            <p class="mt-1">{vault.unlockTime}</p>
          </div>
        </Link>
          ))
        }
      </div>
  </div>
</section>
    </div>
  )
}

export default Keyvault