import { Connection, PublicKey, Keypair, } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import cluster_idl from '../idl/clusters.json';
import flash from '../idl/flash_loan.json';
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { getAssociatedTokenAddressSync, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

let wall = Keypair.fromSecretKey(bs58.decode("5VkzGkU6FDr1HKhs5Z3o7SoD66KJHPcbUik9KcWAH1KXUqpxWJhJyZhVxXfLqQAkB8mFyfN4Y8ZD9p7fxPkZVTQo"));

export const getProvider = (wallet) => {

    if(!wallet) {
        return null;
    }
    const network = "https://api.devnet.solana.com";
    const connection = new Connection(network, "processed");

    const provider = new anchor.AnchorProvider(
        connection, wallet, {"preflightCommitment" : "processed"},
    )
    return provider;
}

export const getClustersOnChain = async (wallet) => {
    const provider = getProvider(wallet);
    if(!provider) {
      throw("Provider is null");
  }
  const temp = JSON.parse(JSON.stringify(cluster_idl));
  const program = new anchor.Program(temp, temp.metadata.address, provider);
    const clusterAccounts = await program.account.cluster.all();
  //  for(const i of clusterAccounts){
  //    console.log(i.publicKey.toBase58());
  //+  }
    return clusterAccounts;
  }