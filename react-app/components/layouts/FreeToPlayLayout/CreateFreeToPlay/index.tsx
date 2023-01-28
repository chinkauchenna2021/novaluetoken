//@ts-nocheck
import React, { useState } from "react";
import { DummyUSDTether} from '../../../layouts/doubledice/platform/lib/contracts'
import { useAccount } from "contexts/AccountContext";
import  DummyUSDTethers from '../../../layouts/doubledice/platform/artifacts/contracts/dev/dummy/DummyUSDTether.sol/DummyUSDTether.json';
import {  Contract,BigNumber as BigInteger,ethers} from "ethers";
import { useRouter } from "next/router";
import { $ } from "utils/helpers";
import { addNetwork } from "utils/chains";
import { Web3Provider } from "@ethersproject/providers";

import * as SC from "./styles";
import { JsonRpcSigner } from "@ethersproject/providers";

interface ParamsProps {
  walletAddress:string;
}

const CreateFreeToPlay = () => {

  const { signer } = useAccount();
  const router = useRouter();
  const [providers , setProviders] = useState<ethers.providers.Web3Provider>();
  const [walletAddress , setWalletAddress] = useState<string>();
  const [signers , setSigners] = useState<JsonRpcSigner>();
  const [contract , setContract] = useState<ethers.Contract>();
  const [tether , setTether] = useState< DummyUSDTether>();
  const [balances , setBalances] = useState<string>();
  const [balanceConversion , setBalanceConversion] = useState<string>();
  const contractAddress = "0x61BD018F5d1E577EB0142023EF25bDfd00a9843B";


React.useEffect(()=>{
  (async()=>{

    if(window.ethereum){ 
      try{
         let provider = new ethers.providers.Web3Provider(window.ethereum)
         // const provider = ethers.getDefaultProvider();
         await provider.send("eth_requestAccounts", []);
         
     
         const signer = provider.getSigner();
         const address = await signer?.getAddress();
         const Contracts =  new ethers.Contract(contractAddress,DummyUSDTethers.abi,signer)
        
         const balance = (await Contracts.balanceOf(address));
         console.log(`this is you token balance ${balance}`)
         const {chainId} = await provider.getNetwork();
         console.log(chainId);
         // etherConnversion(balance);
         setSigners(signer);
         setProviders(provider);
         setWalletAddress(address);
         setContract(Contracts);
         setBalances(balances);


       }catch(e){
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        // const provider = ethers.getDefaultProvider();
        await provider.send("eth_requestAccounts", []);
        
        console.log("wallet change pending");
       }
  
    
    }else{
  
      alert("Metamask is not installed, please install!");
      return;
    }
  
  })();
  

},[])



  const recieveDoublediceFaucet = async (e: React.MouseEvent<HTMLButtonElement>)=>{
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    // const provider = ethers.getDefaultProvider();
    await provider.send("eth_requestAccounts", []);

    const chains = await provider.getNetwork();
    const  chainsId = chains.chainId;
    
    if(chainsId !== 80001){
       alert("You are attempting to send token on a wrong chain. Please switch chain to Mumbai Testnet");
       (window as any).location.reload();
       return;
    }
    
    let private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    let send_token_amount = "1000"
    let to_address = walletAddress;
    let send_address = "0xc5CBb98EC07Fb706c8Fd4f398bFf80F037B615eD";
    let gas_limit = "0x100000";
    let ethersProvider = new ethers.providers.Web3Provider(window.ethereum as Web3Provider);
    let walletSigners = new ethers.Wallet(private_key,ethersProvider)
    
    let contract_address = "0x61BD018F5d1E577EB0142023EF25bDfd00a9843B"
    
    let currentGasPrice = await  ethersProvider.getGasPrice();
        let gas_price = ethers.utils.hexlify(currentGasPrice)
        console.log(`gas_price: ${gas_price}`)
        
          // general token send
          let contract = new ethers.Contract(
            contract_address,
            DummyUSDTethers.abi,
            walletSigners
          )
          // How many tokens?
          let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 6)
          console.log(`numberOfTokens: ${numberOfTokens}`)
    
          // Send tokens
    try{

      let transferResult = await  contract.transferFaucetToken(to_address, BigInteger.from(numberOfTokens))
           // ether send
      if(transferResult){
  
        alert('1000 USDT has been sent to your wallet Address');
      }

    }catch(e){

      alert('your wallet address is gray listed. you are not allowed to recieve USDT within the next 24 hours')
    }
          
    
}





  const addToWallet = async (e:React.MouseEvent<HTMLButtonElement>)=>{
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    // const provider = ethers.getDefaultProvider();
    await provider.send("eth_requestAccounts", []);

    const tokenAddress = "0x61BD018F5d1E577EB0142023EF25bDfd00a9843B";

        const tokenSymbol = 'USDT' 
        const tokenDecimals = 6
    
        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await providers?.send('wallet_watchAsset', {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNTI5LjE2NjY5bW0iCiAgIGhlaWdodD0iNTI5LjE2NjY5bW0iCiAgIHZpZXdCb3g9IjAgMCA1MjkuMTY2NjkgNTI5LjE2NjY5IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmc4MDUwMSIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzODA0OTgiIC8+CiAgPGcKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2Ni4wNjk4MiwxNzUuOTIxMTcpIj4KICAgIDxwYXRoCiAgICAgICBkPSJtIDk4LjUxMzUxLDM1My4yNDU0OSBjIDE0Ni42MjQxNCwwIDI2NC41ODMzMywtMTE3Ljk1OTE5IDI2NC41ODMzMywtMjY0LjU4MzMzIDAsLTE0Ni42MjQxNDQgLTExNy45NTkxOSwtMjY0LjU4MzMzIC0yNjQuNTgzMzMsLTI2NC41ODMzMyAtMTQ2LjYyNDE0NCwwIC0yNjQuNTgzMzMsMTE3Ljk1OTE4NiAtMjY0LjU4MzMzLDI2NC41ODMzMyAwLDE0Ni42MjQxNCAxMTcuOTU5MTg2LDI2NC41ODMzMyAyNjQuNTgzMzMsMjY0LjU4MzMzIHoiCiAgICAgICBmaWxsPSIjMjc3NWNhIgogICAgICAgaWQ9InBhdGgyIgogICAgICAgc3R5bGU9ImZpbGw6I2Q0MmUxZTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC4yNjQ1ODMiIC8+CiAgICA8cGF0aAogICAgICAgZD0ibSAxNzEuMjczOTMsMTMwLjU1MzY0IGMgMCwtMzguNTg0MTg4IC0yMy4xNTEwNSwtNTEuODEzMzU1IC02OS40NTMxMywtNTcuMzI0NjI2IEMgNjguNzQ3ODg1LDY4LjgxODQxIDYyLjEzMzMwMiw1OS45OTk4NDggNjIuMTMzMzAyLDQ0LjU2NDA1NiBjIDAsLTE1LjQzNTc5MSAxMS4wMjUxODcsLTI1LjM1NTAyIDMzLjA3MjkxNiwtMjUuMzU1MDIgMTkuODQzNzUyLDAgMzAuODY4OTQyLDYuNjE0NTgzIDM2LjM4MDIxMiwyMy4xNTEwNDEgMS4xMDMzMSwzLjMwNzI5MiA0LjQxMDYsNS41MTEyNzEgNy43MTc4OSw1LjUxMTI3MSBoIDE3LjYzNzEzIGMgNC40MTA2LDAgNy43MTc4OSwtMy4zMDcyOTIgNy43MTc4OSwtNy43MTUyNSBWIDM5LjA1Mjc4NiBDIDE2MC4yNDg3NCwxNC43OTg0MzIgMTQwLjQwNDk5LC0zLjk0MjAwNTUgMTE1LjA0OTk3LC02LjE0NTk4NDYgViAtMzIuNjA0MzE4IGMgMCwtNC40MTA2MDQgLTMuMzA3MjksLTcuNzE3ODk1IC04LjgxODU2LC04LjgyMTIwOCBIIDg5LjY5NDk0OCBjIC00LjQxMDYwNCwwIC03LjcxNzg5NiwzLjMwNzI5MiAtOC44MjEyMDksOC44MjEyMDggViAtNy4yNDkyOTcxIEMgNDcuODAwODIzLC0yLjgzODY5MyAyNi44NTY0MDcsMTkuMjA5MDM2IDI2Ljg1NjQwNyw0Ni43NzA2ODEgYyAwLDM2LjM4MDIwOCAyMi4wNDc3MjksNTAuNzEwMDQxIDY4LjM0OTgxMSw1Ni4yMjM5NTkgMzAuODY4OTQyLDUuNTExMjcgNDAuNzkwODEyLDEyLjEyNTg1IDQwLjc5MDgxMiwyOS43NjU2MiAwLDE3LjYzOTc3IC0xNS40MzU3OSwyOS43NjU2MyAtMzYuMzgwMjA4LDI5Ljc2NTYzIC0yOC42NjQ5NTcsMCAtMzguNTg2ODMyLC0xMi4xMjg1IC00MS44OTQxMjQsLTI4LjY2NDk2IC0xLjEwMDY2NywtNC40MDc5NiAtNC40MDc5NTgsLTYuNjE0NTggLTcuNzE1MjUsLTYuNjE0NTggSCAzMS4yNjQzNjUgYyAtNC40MDc5NTgsMCAtNy43MTUyNSwzLjMwNzI5IC03LjcxNTI1LDcuNzE3ODkgdiAxLjEwMzMyIGMgNC40MDc5NTgsMjcuNTU4OTkgMjIuMDQ3NzI5LDQ3LjQwMjc0IDU4LjQyNzkzNyw1Mi45MTY2NiB2IDI2LjQ1ODMzIGMgMCw0LjQwNzk2IDMuMzA3MjkyLDcuNzE1MjUgOC44MTg1NjIsOC44MTg1NyBoIDE2LjUzNjQ1NiBjIDQuNDEwNjEsMCA3LjcxNzksLTMuMzA3MjkgOC44MjEyMSwtOC44MTg1NyB2IC0yNi40NTgzMyBjIDMzLjA3MjkyLC01LjUxMzkyIDU1LjEyMDY1LC0yOC42NjQ5NiA1NS4xMjA2NSwtNTguNDMwNTggeiIKICAgICAgIGZpbGw9IiNmZmYiCiAgICAgICBpZD0icGF0aDQiCiAgICAgICBzdHlsZT0iZmlsbDojMWZhZTRhO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDowLjI2NDU4MyIgLz4KICAgIDxwYXRoCiAgICAgICBkPSJNIDQyLjI4OTU1MiwyNDYuMzA4ODUgQyAtNDMuNzAwMDMsMjE1LjQ0MjU1IC04Ny43OTgxMzMsMTE5LjUzMTEgLTU1LjgyNTg4NCwzNC42NDIxODIgYyAxNi41MzY0NTgsLTQ2LjMwMjA4MyA1Mi45MTY2NjYxLC04MS41Nzg5NzkgOTguMTE1NDM2LC05OC4xMTU0MzcgNC40MTA2MDQsLTIuMjAzOTc5IDYuNjE0NTg0LC01LjUxMTI3MSA2LjYxNDU4NCwtMTEuMDI1MTg3IHYgLTE1LjQzMzE0NiBjIDAsLTQuNDEwNjA0IC0yLjIwMzk4LC03LjcxNzg5NSAtNi42MTQ1ODQsLTguODE4NTYyIC0xLjEwMzMxMiwwIC0zLjMwNzI5MSwwIC00LjQxMDYwNCwxLjEwMDY2NyBDIC02Ni44NTEwNzEsLTY0LjU3NjU2NyAtMTI0LjE3ODM0LDQ2Ljc3MDY4MSAtOTEuMTA1NDI1LDE1MS41MDA3IGMgMTkuODQzNzUsNjEuNzM1MjMgNjcuMjQ5MTQ1LDEwOS4xNDA2MiAxMjguOTg0MzczLDEyOC45ODQzNyA0LjQxMDYwNCwyLjIwMzk4IDguODIxMjA4LDAgOS45MjE4NzUsLTQuNDEwNiAxLjEwMzMxMywtMS4xMDA2NyAxLjEwMzMxMywtMi4yMDM5OCAxLjEwMzMxMywtNC40MDc5NiB2IC0xNS40MzU3OSBjIDAsLTMuMzA3MjkgLTMuMzA3MjkyLC03LjcxNTI1IC02LjYxNDU4NCwtOS45MjE4NyB6IE0gMTU5LjE0ODA3LC05Ny42NDk0ODMgYyAtNC40MTA2LC0yLjIwMzk4IC04LjgyMTIxLDAgLTkuOTIxODcsNC40MTA2MDQgLTEuMTAzMzIsMS4xMDMzMTIgLTEuMTAzMzIsMi4yMDM5NzkgLTEuMTAzMzIsNC40MTA2MDQgdiAxNS40MzMxNDUgYyAwLDQuNDEwNjA0IDMuMzA3Myw4LjgxODU2MyA2LjYxNDU5LDExLjAyNTE4OCA4NS45ODk1OCwzMC44NjYyOTEgMTMwLjA4NzY4LDEyNi43Nzc3NDggOTguMTE1NDMsMjExLjY2NjY2MiAtMTYuNTM2NDUsNDYuMzAyMDggLTUyLjkxNjY2LDgxLjU3ODk4IC05OC4xMTU0Myw5OC4xMTU0NCAtNC40MTA2MSwyLjIwMzk4IC02LjYxNDU5LDUuNTExMjcgLTYuNjE0NTksMTEuMDI1MTkgdiAxNS40MzMxNCBjIDAsNC40MTA2MSAyLjIwMzk4LDcuNzE3OSA2LjYxNDU5LDguODE4NTYgMS4xMDMzMSwwIDMuMzA3MjksMCA0LjQxMDYsLTEuMTAwNjYgQyAyNjMuODc4MDksMjQ4LjUxNTQ3IDMyMS4yMDUzNiwxMzcuMTY4MjIgMjg4LjEzMjQ1LDMyLjQzODIwMiAyNjguMjg4NywtMzAuNDAwMzM5IDIxOS43Nzk5OSwtNzcuODA1NzM0IDE1OS4xNDgwNywtOTcuNjQ5NDgzIFoiCiAgICAgICBmaWxsPSIjZmZmIgogICAgICAgaWQ9InBhdGg2IgogICAgICAgc3R5bGU9ImZpbGw6IzFmYWU0YTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC4yNjQ1ODMiIC8+CiAgPC9nPgo8L3N2Zz4K'// A string url of the token logo
            }
          } as any)
          if (wasAdded) {
            console.log('Thanks for your interest !')
          } else {
            console.log('Your loss!')
          }
        } catch (error) {
          console.log(error)
        
        }
    
};
// Enter play ground
const enterToPlayPage = ()=>{

  router.push('/enterFreeToPlay');
}

const connectToMetamask = async ()=>{
  if(window.ethereum !== undefined){
     
    
   await addNetwork(80001);
  }else{
    alert('metamask is not installed');
  }
}



  return (

    <SC.Holder>
      <SC.Title>Doubledice Dummy USDT  Faucet Token</SC.Title>
      <div style={{width:'100%',display:'flex',justifyContent:"flex-end"}} > <SC.Button type="submit" onClick={()=>connectToMetamask()}>🦊 connect to metamask and Switch to Mumbai </SC.Button></div>
      <SC.Button type="submit" onClick={(e)=>addToWallet(e)}>🦊 Add USDT to metamask</SC.Button>
      <SC.Button type="submit" onClick={(e)=>recieveDoublediceFaucet(e)}>GET 💰💰💰 1000 USDT </SC.Button>
      {/* <SC.Button type="submit" onClick={enterToPlayPage}>⏪⏪⏪ Enter Free to Play Page  </SC.Button> */}
    </SC.Holder>
  );
};

export default CreateFreeToPlay ;
