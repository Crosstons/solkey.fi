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

  export const initCluster = async (wallet, cluster_program, t1key, t2key, t3key) => {
    const provider = getProvider(wallet);
    if(!provider) {
        throw("Provider is null");
    }
    const temp = JSON.parse(JSON.stringify(cluster_idl));
    const program = new anchor.Program(temp, temp.metadata.address, provider);

    const [mintOneAcc, mintOneAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t1key.toBuffer(), cluster_program.toBuffer()],
        program.programId
      );
  
      const [mintTwoAcc, mintTwoAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t2key.toBuffer(), cluster_program.toBuffer()],
        program.programId
      );
  
      const [mintThreeAcc, mintThreeAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
        [t3key.toBuffer(), cluster_program.toBuffer()],
        program.programId
      );
//    const clusterAccounts = await program.account.cluster.all();
//    console.log(clusterAccounts);
    try{
        await program.methods.initCluster()
        .accounts({
        cluster : cluster_program,
        signer : provider.wallet.publicKey,
        mintOne : t1key,
        mintTwo : t2key,
        mintThree : t3key,
        mintOneAccount : mintOneAcc,
        mintTwoAccount : mintTwoAcc,
        mintThreeAccount : mintThreeAcc,
        tokenProgram : TOKEN_PROGRAM_ID,
        systemProgram : anchor.web3.SystemProgram.programId,
        rent : anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([])
        .rpc();
            console.log("Tx Successful");
            return("WooHoo Tx Successful");
        } catch(error) {
            console.log(error);
            return(error);
        }
} 

export const issueCluster = async (wallet, cluster_program, amount, t1key, t2key, t3key) => {
  const provider = getProvider(wallet);
  if(!provider) {
      throw("Provider is null");
  }
  const temp = JSON.parse(JSON.stringify(cluster_idl));
  const program = new anchor.Program(temp, temp.metadata.address, provider);

  const [mintOneAcc, mintOneAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [t1key.toBuffer(),cluster_program.toBuffer()],
      program.programId
    );

  const [mintTwoAcc, mintTwoAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [t2key.toBuffer(),cluster_program.toBuffer()],
      program.programId
    );

  const [mintThreeAcc, mintThreeAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [t3key.toBuffer(),cluster_program.toBuffer()],
      program.programId
    );

  let [tokenPubKey, tokenBump] =
    anchor.web3.PublicKey.findProgramAddressSync(
    [cluster_program.toBuffer()],
    program.programId
  );

  const issuerOne = getAssociatedTokenAddressSync(t1key, provider.wallet.publicKey);
  const issuerTwo = getAssociatedTokenAddressSync(t2key, provider.wallet.publicKey);
  const issuerThree = getAssociatedTokenAddressSync(t3key, provider.wallet.publicKey);
  const clustTokAcc = getAssociatedTokenAddressSync(tokenPubKey, provider.wallet.publicKey);

  try{
      await program.methods.issueCluster(new anchor.BN(amount), tokenBump)
      .accounts({
      cluster : cluster_program,
      signer : provider.wallet.publicKey,
      issuerOne : issuerOne,
      issuerTwo : issuerTwo,
      issuerThree : issuerThree,
      clusterOne : mintOneAcc,
      clusterTwo : mintTwoAcc,
      clusterThree : mintThreeAcc,
      mintOne : t1key,
      mintTwo : t2key,
      mintThree : t3key,
      clusterToken : tokenPubKey,
      clusterTokenAccount : clustTokAcc,
      tokenProgram : TOKEN_PROGRAM_ID,
      systemProgram : anchor.web3.SystemProgram.programId,
      })
      .signers([])
      .rpc();
          console.log("Tx Successful");
          return("WooHoo Tx Successful");
      } catch(error){
          console.log(error);
          return(error);
      }
}

export const redeemCluster = async (wallet, cluster_program, amount, t1key, t2key, t3key) => {
  const provider = getProvider(wallet);
  if(!provider) {
      throw("Provider is null");
  }
  const temp = JSON.parse(JSON.stringify(cluster_idl));
  const program = new anchor.Program(temp, temp.metadata.address, provider);

  const [mintOneAcc, mintOneAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [t1key.toBuffer(), cluster_program.toBuffer()],
      program.programId
    );

  const [mintTwoAcc, mintTwoAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [t2key.toBuffer(), cluster_program.toBuffer()],
      program.programId
    );

  const [mintThreeAcc, mintThreeAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
      [t3key.toBuffer(), cluster_program.toBuffer()],
      program.programId
    );

  let [tokenPubKey, tokenBump] =
    anchor.web3.PublicKey.findProgramAddressSync(
    [cluster_program.toBuffer()],
    program.programId
  );

  const redeemerOne = getAssociatedTokenAddressSync(t1key, provider.wallet.publicKey);
  const redeemerTwo = getAssociatedTokenAddressSync(t2key, provider.wallet.publicKey);
  const redeemerThree = getAssociatedTokenAddressSync(t3key, provider.wallet.publicKey);
  const clustTokAcc = getAssociatedTokenAddressSync(tokenPubKey, provider.wallet.publicKey);
  try{
  await program.methods.redeemCluster(new anchor.BN(amount), mintOneAccBump, mintTwoAccBump, mintThreeAccBump)
  .accounts({
    cluster : cluster_program,
    signer : provider.wallet.publicKey,
    redeemerOne : redeemerOne,
    redeemerTwo : redeemerTwo,
    redeemerThree : redeemerThree,
    clusterOne : mintOneAcc,
    clusterTwo : mintTwoAcc,
    clusterThree : mintThreeAcc,
    mintOne : t1key,
    mintTwo : t2key,
    mintThree : t3key,
    clusterToken : tokenPubKey,
    clusterTokenAccount : clustTokAcc,
    tokenProgram : TOKEN_PROGRAM_ID,
    systemProgram : anchor.web3.SystemProgram.programId,
  })
  .signers([])
  .rpc(); 
      console.log("Tx Successful");
      return("WooHoo Tx Successful");
  } catch(error){
      console.log(error);
      return(error);
  }
}


//// Create A Functionality inside the Solana Program to initialize token accounts individually for each mint in Future ////////////

export const createTokenAccounts = async (wallet, cluster_program, t1key, t2key, t3key) => {
const provider = getProvider(wallet);
if(!provider) {
    throw("Provider is null");
}
const network = "https://api.devnet.solana.com";
const connection = new Connection(network, "processed");
const temp = JSON.parse(JSON.stringify(cluster_idl));
const program = new anchor.Program(temp, temp.metadata.address, provider);
let [tokenPubKey, tokenBump] =
anchor.web3.PublicKey.findProgramAddressSync(
[cluster_program.toBuffer()],
program.programId
);
try{
  const temp = await getOrCreateAssociatedTokenAccount(provider.connection, wall, tokenPubKey, provider.wallet.publicKey);
  const issuerOne = await getOrCreateAssociatedTokenAccount(provider.connection,wall,t1key,provider.wallet.publicKey);
  const issuerTwo = await getOrCreateAssociatedTokenAccount(provider.connection,wall,t2key,provider.wallet.publicKey);
  const issuerThree = await getOrCreateAssociatedTokenAccount(provider.connection,wall,t3key,provider.wallet.publicKey);
  console.log("Done");
  return("WooHoo Tx Successful");
} catch(error) {
  console.log(error);
  return(error);
}
}

export const faucetTestTokens = async (wallet, t1key, t2key, t3key) => {
const provider = getProvider(wallet);
if(!provider) {
    throw("Provider is null");
}
try{
  const issuerOne = await getOrCreateAssociatedTokenAccount(provider.connection,wall,t1key,provider.wallet.publicKey);
  const issuerTwo = await getOrCreateAssociatedTokenAccount(provider.connection,wall,t2key,provider.wallet.publicKey);
  const issuerThree = await getOrCreateAssociatedTokenAccount(provider.connection,wall,t3key,provider.wallet.publicKey);
  await mintTo(provider.connection, wall, t1key, issuerOne.address, wall, 100000);
  await mintTo(provider.connection, wall, t2key, issuerTwo.address, wall, 100000);
  await mintTo(provider.connection, wall, t3key, issuerThree.address, wall, 100000);
  console.log("Done")
  return("WooHoo Tx Successful");
} catch(error){
  console.log(error);
  return(error);
}
}

export const createCluster = async (wallet, clusterName, clusterSymbol, keyOne, keyTwo, keyThree, amt1, amt2, amt3) => {
  const provider = getProvider(wallet);
  if(!provider) {
      throw("Provider is null");
  }
  const cluster_program = anchor.web3.Keypair.generate();
  const temp = JSON.parse(JSON.stringify(cluster_idl));
  const program = new anchor.Program(temp, temp.metadata.address, provider);
  let [tokenPubKey, tokenBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
      [cluster_program.publicKey.toBuffer()],
      program.programId
  );
  try{
      await program.methods.createCluster(clusterName, clusterSymbol, keyOne, keyTwo, keyThree, amt1, amt2, amt3)
      .accounts({
        cluster : cluster_program.publicKey,
        signer : provider.wallet.publicKey,
        clusterMint : tokenPubKey,
        tokenProgram : TOKEN_PROGRAM_ID,
        systemProgram : anchor.web3.SystemProgram.programId,
      })
      .signers([cluster_program])
      .rpc();
      console.log("Tx Successful");
      alert("WooHoo Cluster Created");
  } catch(error){
      console.log(error);
      alert(error);
  }
}

export const executeFlash = async (wallet, cluster_program, flash_program, tokKey) => {
  const provider = getProvider(wallet);
  if(!provider) {
    throw("Provider is null");
  }
  const temp = JSON.parse(JSON.stringify(cluster_idl));
  const program = new anchor.Program(temp, temp.metadata.address, provider);

  const [mintAcc, mintAccBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [tokKey.toBuffer(),
    cluster_program.toBuffer()
    ],
    program.programId
  );

  let [flashLoanTokenAccount, flashBump] =
  anchor.web3.PublicKey.findProgramAddressSync(
  [tokKey.toBuffer(), flash_program.toBuffer()],
    program.programId
);

  try{
    await program.methods.executeFlash(new anchor.BN(1), mintAccBump, flashBump)
    .accounts({
      flash : flash_program,
      signer : provider.wallet.publicKey,
      flashProgram : new anchor.web3.PublicKey("HyCwgwM8oEscef5NpE7VnMmkTDxu6wsUSog43CKPfmq8"),
      cluster : cluster_program,
      mint : tokKey,
      clusterTokenAccount : mintAcc,
      flashTokenAccount : flashLoanTokenAccount,
      tokenProgram : TOKEN_PROGRAM_ID,
      systemProgram : anchor.web3.SystemProgram.programId,         
    })
    .signers([])
    .rpc()
    alert("Flash Executed");
  } catch(error){
    alert(error);
    console.log(error);
  }

}

export const initFlash = async (wallet, tokKey) => {
  const provider = getProvider(wallet);
  if(!provider) {
    throw("Provider is null");
  }
  const temp = JSON.parse(JSON.stringify(flash));
  const program = new anchor.Program(temp, temp.metadata.address, provider);
  const flash_program = anchor.web3.Keypair.generate();
  console.log(flash_program.publicKey.toString());

  try{
    await program.methods.init()
    .accounts({
      flash : flash_program.publicKey,
      signer : wall.publicKey,
      mint : tokKey,
      tokenProgram : TOKEN_PROGRAM_ID,
      systemProgram : anchor.web3.SystemProgram.programId,        
    })
    .signers([wall, flash_program])
    .rpc();
    alert("Flash Created");
  } catch(error){
    alert(error);
  }

}