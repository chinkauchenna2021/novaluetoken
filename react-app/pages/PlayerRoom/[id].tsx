//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { convertTimestampToDate } from "utils/helpers";
import * as SC from "./styles";
import { Opponent } from "../../components/layouts/doubledice/platform/lib/graph";
import CreateFreeToPlayInput from "components/layouts/FreeToPlayLayout/FreeToPlayInput";
import { useAccount } from "contexts/AccountContext";
import { BigNumber, ethers  ,BigNumberish } from "ethers";
import { $ } from "utils/helpers";
import { toTimestamp } from "utils/toTimestamp";
import { BigNumber as BigDecimal } from 'bignumber.js';
import { useQuery } from "@apollo/client";
// import { EthereumProvider, EthereumProviderHelper } from '@/mm'
// import { } from "@doubledice/platform/lib/graph";
import {
  DoubleDice as DoubleDiceContract,
  DoubleDice__factory,
  encodeVirtualFloorMetadata,
  RoomEventInfo,
  VirtualFloorCreationParamsStruct,
  VirtualFloorMetadataV1Struct
} from '../../components/layouts/doubledice/platform/lib/contracts'
import DoubleDices  from "../../components/layouts/doubledice/platform/generated/abi/DoubleDice.json";
import { validateRoomEventInfo } from '../../components/layouts/doubledice/platform/lib/metadata'
import { JsonRpcSigner } from "@ethersproject/providers";
import { Graphhelper } from "components/libs/Graphhelper";
import { Clasical_Abi } from "components/libs/Clasical_Abi";
import {MAIN_CONTRACT_ADDRESS} from '../../components/main';
import { USER_SPECIFIC_VIRTUAL_FLOOR } from "queries";





interface ParamsProps {
  nSpins: number;
  paymentToken: string;
  totalFeeRate_e18: number;
  bonusAmounts: string;
  tOpen: Date;
  tResolve: Date;
  nOutcomes: number;
  optionalMinCommitmentAmount: number;
  optionalMaxCommitmentAmount: number;
  tableName: string;
  environmentName: string;
}

interface Oponents{
 id:string;
 image:string;
 title:string
}

const PlayerRoom= () => {
  const [availableBet , setAvailableBet]  = useState<any[]>();
  const [title , setTitle] = useState<string>("Click on Available bets to commit");
  const [opponentsData , setOpponentsData]  = useState<Opponent[]>();
  const [userId , setUserId] = useState<string>("20");
  const [outcomeData , setOutcomeData] = useState<any[]>();
  const [betAmount , setBetAmount] = useState<number>(0)
  const [allGames , setAllGames] = useState<any[]>();


  const [providers , setProviders] = useState<ethers.providers.Web3Provider>();
  const [walletAddress , setWalletAddress] = useState<string>();
  const [signers , setSigners] = useState<JsonRpcSigner>();
  const [contract , setContract] = useState<ethers.Contract | DoubleDiceContract>()
  const [betIndex , setBetIndex ] = useState<string>();
  const [ids , setIds] = useState<string | string[] | undefined>();
  const [closeTime , setCloseTime] = useState<string>()
  const [resolveTime , setResolveTime] = useState<string>();
  const [vfState , setVfState] = useState<string>()
  const [payout , setPayout] = useState<any[]>();
  const [payIndex , setPayIndex] = useState<any[]>([])

  const router = useRouter();
  const id =router.query.id;

  
  useEffect(()=>{
  
    // setIds(id)
    (async()=>{
      
      setIds(id)
      if(window.ethereum){ 
    
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer =  provider.getSigner();
        const address = await signer?.getAddress();
    
        const mainContract = DoubleDice__factory.connect(MAIN_CONTRACT_ADDRESS, signer)
    
        // const Contracts =  new ethers.Contract(MAIN_CONTRACT_ADDRESS,DoubleDice__factory.abi,signer)
        
        setSigners(signer);
        setProviders(provider);
        setWalletAddress(address);
        setContract(mainContract);
    
      
      
      }else{
    
        alert("Metamask is not installed, please install!");
        return;
      }
    
    
    })();



(async()=>{


  let outcome_id = String(id);
  let  users = String(walletAddress?.toLowerCase())
  let body =  { 
      query: `
          query {
            virtualFloors(first: 100,orderBy: tCreated, orderDirection: asc , where : { id : "${outcome_id}"}) {
              intId
              paymentToken {
                symbol
                decimals
              }
              protocolFeeRate
              tCreated
              tOpen
              tClose
              tResultSetMin
              state
              winnerProfits
              resolutionOrCancellationTxHash
              totalSupply
              betaOpen
              outcomes{
                index
                title
                totalSupply
                totalWeightedSupply
                userOutcomes(where: {user:"${users}" ,totalBalance_gt: 0}) {
                   user{
                    id
                  }
                  totalBalance
                  totalWeightedBalance
                  userOutcomeTimeslots(where: {balance_gt: 0}) {
                    balance
                    outcomeTimeslot {
                      id
                      beta
                      tokenId
                    }
                  }
                }
              }
              creator {
                id
              }
          
              bonusAmount
              subcategory {
                id
                subid
                category {
                  id
                }
              }
              title
              description
              isListed
              opponents {
                id
                title
                image
              }
              resultSources {
                id
                title
                url
              }
            }
          }
      `, 
      variables: {}
  }
  let options = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

let result =  await  axios.post('https://api.thegraph.com/subgraphs/name/chinkauchenna2021/doubledice_playground',body, options)

setPayout(result.data.data.virtualFloors[0]?.outcomes)


})();


(async()=>{

   try{
    

    let outcome_id = String(id);
    let body =  { 
        query: `
            query {
              virtualFloors(first: 100,orderBy: tCreated, orderDirection: asc , where : { id : "${outcome_id}"}) {
                intId
                paymentToken {
                  symbol
                  decimals
                }
                protocolFeeRate
                tCreated
                tOpen
                tClose
                tResultSetMin
                state
                winnerProfits
                resolutionOrCancellationTxHash
                totalSupply
                betaOpen
               outcomes(first:100,where:{totalSupply_gt:0}){
              index
              title
              totalSupply
              totalWeightedSupply
              userOutcomes(where : {totalBalance_gt: 0}) {
                totalBalance
                totalWeightedBalance
                userOutcomeTimeslots(where:{balance_gt: 0}) {
                  balance
                  outcomeTimeslot {
                    beta
                    timeslot
                    tokenId
                  }
                }
              }
            }
                creator {
                  id
                }
            
                bonusAmount
                subcategory {
                  id
                  subid
                  category {
                    id
                  }
                }
                title
                description
                isListed
                opponents {
                  id
                  title
                  image
                }
                resultSources {
                  id
                  title
                  url
                }
              }
            }
        `, 
        variables: {}
    }
    let options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

let result =  await  axios.post('https://api.thegraph.com/subgraphs/name/chinkauchenna2021/doubledice_playground',body, options)

    


      setAvailableBet(result.data.data.virtualFloors)
     allData(result.data.data.virtualFloors)
      setResolveTime(result.data.data.virtualFloors[0].tResultSetMin)
      setCloseTime(result.data.data.virtualFloors[0].tClose)
     setOutcomeData(result.data.data.virtualFloors[0].outcomes)
      // selectedBet(ureslt.data.data.virtualFloors)
    }catch(e){
     console.log("not available")
    }

})();


(async()=>{
  const initialVfState = [
    "Active_ResultChallenged",
    "Active_ResultNone",
    "Active_ResultSet",
    "Claimable_Payouts",
    "Claimable_Refunds_Flagged",
    "Claimable_Refunds_ResolvableNever",
    "Claimable_Refunds_ResolvedNoWinners",
  ];

try{
  let tx = await contract?.getVirtualFloorState(ids); 
  tx = tx -1;
   let realState = initialVfState[tx]; 
  setVfState(realState)
  }catch(e){
     console.log(e)
  }


})()






},[availableBet,ids])

const allData = (data:any[])=>{
 setAvailableBet(data)
 console.log(data)
 selectedBet(data[0].opponents);
}

const convertTime = (bettime:number)=>{
  let timeConverted =   new Date(1970 , 0 , 1);
  // console.log(timeConverted)
    timeConverted.setSeconds(bettime)
  return timeConverted;
}


const selectedBet = (opponents:Opponent[])=>{
  const title = availabelOponents(opponents);
  setOpponentsData(opponents);
  setTitle(title);
}


const availabelOponents = (obj:Oponents[]):string =>{
  console.log(obj)
  const value = obj.map((o)=>o.title).join(' vs ')
  return  value.toString();
}



function checkStatus():string{
  let date = new Date();
  let seconds = Math.floor(date.getTime() / 1000);
  let tClose = Number(closeTime);
   let tResultSetMin = Number(resolveTime);
  if(seconds < tClose){
 
   return ("Live");
  }else if ((seconds > tClose) && (seconds < tResultSetMin)){
 
   return ("Awaiting result")
  }else{
 
   return ('Bet Closed')
  }
 }

 const reload = ()=>{

  window.location.reload();
 }

// commit to virtual floor 

  const commitToBet = async()=>{

  const amount =  ethers.utils.parseUnits(String(betAmount),6)
    try{

      let tx = await contract?.commitToVirtualFloor(
        id,
        betIndex,
        amount,
        0,{gasLimit:320000})

    }catch(e){

      console.log(e);
    }
  reload()
  // console.log(id)
  }




  const sumSupply = ():number =>{
    let sumData =  0;
    console.log(outcomeData)
    outcomeData?.map(outcome=>{

sumData += Number(outcome.totalSupply)
    })
   return sumData;
  }

  const sumWeightedSupply = ():number =>{
    let sumData =  0;
    console.log(outcomeData)
    outcomeData?.map(outcome=>{

   sumData += Number(outcome.totalWeightedSupply)
    })
    return sumData;
  }





 



const findUsersBet = ():boolean[] | undefined=>{
  console.log(payout)
let value =  payout?.map(data=>{
   if (data.userOutcomes.length !== 0){
     payIndex?.push(data.index)
      return true
   }else{

    return false
   }

 })
 return value
}

  async function claimPayout() {
    try{

      const tx =  await  contract?.claimPayouts(ids,Array.from(new Set(payIndex)), {gasLimit:320000});
      console.log(tx)

    }catch(e){

      console.log(e)
    }
  }

  async function claimRefundNotResolved() {
    try{
      
      const tx =  await  contract?.claimRefunds(ids,Array.from(new Set(payIndex)),{gasLimit:320000});
    }catch(e){

      console.log(e)
    }
  }

  async function claimRefundNoWinner(){
    try{

      const tx =  await  contract?.claimRefunds(ids,Array.from(new Set(payIndex)),{gasLimit:320000});

    }catch(e){

      console.log(e) 
    }
  }

  async function claimRefundFlaged(){
    try{

      const tx =  await  contract?.claimRefunds(ids,Array.from(new Set(payIndex)),{gasLimit:320000});
    }catch(e){
      console.log(e)
    }
  }



  return (
    <>
    <SC.Container>
      <div>
        <SC.Title>Choose Free TO Play Games </SC.Title>


        {(checkStatus() == "Live")? 
        
     (<SC.TableContainer>
   <SC.PlayerContainer>
         <div style={{width:'100%',minHeight:'60px',display:'flex',justifyContent:"center",alignItems:"center"}}>
                             {
                            (availableBet?.length === 0)?  ("loading") : ( <div> <span style={{fontSize:"25px",fontWeight:'bold',marginRight:"30px",fontFamily:"serif"}}>{title}</span></div>)
                }                     
         </div>
          <div>
          <div>
   
          <div style={{display:'flex',flexDirection:'column',marginTop:'3px'}}>
            <label style={{margin:'5px 0px'}}>Choose Options</label>
           <select onChange={(e)=>setBetIndex(e.target.value)} style={{height:'28px',borderRadius:'10px'}}>
            <option>No bet Available</option>
            {opponentsData?.map((data)=>{ 
                return<option value={data.id.slice(-1)} >{data.title}</option>         
            })}
           </select>
          </div>
        <CreateFreeToPlayInput
          type="number"
          value={betAmount}
          onChange={(e)=>setBetAmount(e.target.value)}
          label="Token Amount:"
        />

        <SC.Button onClick={()=>commitToBet()}>Make Bet</SC.Button>
        </div>
          </div>
</SC.PlayerContainer>



        </SC.TableContainer>) 

: (checkStatus() == "Awaiting result")? 


(<SC.TableContainer>
  <SC.PlayerContainer>
  
        <div style={{width:'100%',display:'flex',justifyContent:"center",paddingTop:'20px',fontSize:'30px',fontWeight:'600',flexDirection:"column"}}><span style={{width:'100%',display:"flex",justifyContent:"center"}}>Betting Period Ended.</span> <span style={{width:'100%',display:"flex",justifyContent:"center",fontSize:"30px",fontWeight:"200"}}>Bet creator will input result Soon </span></div>  

      </SC.PlayerContainer>
       </SC.TableContainer>) 






    :



    (<SC.TableContainer>
      <SC.PlayerContainer>


        {((vfState == "Claimable_Payouts") && (findUsersBet()?.includes(true)))? 
        (<SC.Button onClick={()=>claimPayout()}>Claim Payout</SC.Button>)
        :
        ((vfState == "Claimable_Refunds_ResolvableNever") && (findUsersBet()?.includes(true)))? 
        (<SC.Button onClick={()=>claimRefundNotResolved()}>Claim Refund when not resolved</SC.Button>)
          :
         ((vfState == "Claimable_Refunds_ResolvedNoWinners") && (findUsersBet()?.includes(true)))? 
          (<SC.Button  onClick={()=>claimRefundNoWinner()}>Claim Refund because their is no winner</SC.Button>)
         :
         ((vfState == "Claimable_Refunds_Flagged") && (findUsersBet()?.includes(true)))? 
         (<SC.Button onClick={()=>claimRefundFlaged()}>Claim Refund Flagged</SC.Button>)
        :
        "You have no active bet on this VF"
        }
      
            {/* <div style={{width:'100%',display:'flex',justifyContent:"center",paddingTop:'20px',fontSize:'30px',fontWeight:'bold'}}> Game Closed.</div>   */}
    
    </SC.PlayerContainer>
   </SC.TableContainer>) 
    
    







}





      </div>
      <SC.ButtonContainer>
      <SC.CreateNewSession
        onClick={() => {
          router.push("/createFreeGame");
        }}>
        Create Free Game
      </SC.CreateNewSession>
          <SC.CreateNewSession
        onClick={() => {
          router.push("/enterFreeToPlay");
        }}>
        Available Games
      </SC.CreateNewSession>
      <SC.CreateNewSession
        onClick={() => {
          router.push("/");
        }}>
        Back
      </SC.CreateNewSession>

      <div style={{width:"100%",height:"200px",display:'flex',flexDirection:"column",alignItems:"center"}}>
              
           <div style={{width:'100%',display:'flex',justifyContent:"center",fontSize:'20px',fontWeight:'bold',height:'40%',alignItems:'flex-end'}}>POOL</div>
           <div style={{width:'100%',display:'flex',justifyContent:"center",fontSize:'30px',fontWeight:'bold',height:'40%',paddingTop:"10px"}}>{sumSupply() && (sumSupply() > 0)? sumSupply() : 0 } <span style={{color:"green",marginLeft:"10px"}}>USDT</span></div>



      </div>


      </SC.ButtonContainer>
      <SC.TableContainer>
        <h3 style={{display:'flex',justifyContent:'center'}}>Users Bet Outcome</h3>
      <table id="customers" style={{marginTop:'30px',border:'1px solid silver'}}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Option</th>
                <th>Bet</th>
                <th> Weighted </th>
              </tr>
            </thead>

            <tbody>
              {(outcomeData?.length != 0)&&
               outcomeData?.map(outcome=>{
               
                
                 return(
                    <tr>
                   
                      <td>{convertTime(Number(outcome.userOutcomes[0].userOutcomeTimeslots[0].outcomeTimeslot.timeslot)).toLocaleString()}</td>
                      <td>{outcome.title}</td>
                      <td>{outcome.totalSupply}</td>
                      <td>{outcome.totalWeightedSupply}</td>  

                       

                  </tr>
                 )
                    
                 

               })

              }
             <tr>
               <td colSpan={2}>{ (sumSupply() > 0)? "Total" : ""}</td>
               <td>{sumSupply() && (sumSupply() > 0)? sumSupply() : "" }</td>
              <td>{sumWeightedSupply() && (sumWeightedSupply() > 0)? sumWeightedSupply() : "" }</td>

             </tr>
            </tbody>
          </table>





          </SC.TableContainer>



    </SC.Container>
    </>
  );
};

export default PlayerRoom;
