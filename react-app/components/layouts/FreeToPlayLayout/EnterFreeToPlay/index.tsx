import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { convertTimestampToDate } from "utils/helpers";
import Link from "next/link";
import * as SC from './styles'
import CreateFreeToPlayInput from "../FreeToPlayInput";
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
} from '../../../layouts/doubledice/platform/lib/contracts'
import DoubleDices  from "../../../layouts/doubledice/platform/generated/abi/DoubleDice.json";
import { validateRoomEventInfo } from '../../../layouts/doubledice/platform/lib/metadata'
import { JsonRpcSigner } from "@ethersproject/providers";
import { Graphhelper } from "components/libs/Graphhelper";
import { Clasical_Abi } from "components/libs/Clasical_Abi";
import { MAIN_CONTRACT_ADDRESS } from "components/main";
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

const EnterFreeToPlayRoom = () => {
  const [availableBet , setAvailableBet]  = useState<any[]>();
  const [title , setTitle] = useState<string>("Click on Available bets to commit");
  const [opponentsData , setOpponentsData]  = useState<Oponents[]>();
  const [userId , setUserId] = useState<string>("20");
  const [outcomeData , setOutcomeData] = useState<any[]>();
  const [betAmount , setBetAmount] = useState<number>(0)
  const [providers , setProviders] = useState<ethers.providers.Web3Provider>();
  const [walletAddress , setWalletAddress] = useState<string>();
  const [signers , setSigners] = useState<JsonRpcSigner>();
  const [contract , setContract] = useState<ethers.Contract | DoubleDiceContract>()
  // user:${userId}


  // const initialVfState = [
  //   "Active_ResultChallenged",
  //   "Active_ResultNone",
  //   "Active_ResultSet",
  //   "Claimable_Payouts",
  //   "Claimable_Refunds_Flagged",
  //   "Claimable_Refunds_ResolvableNever",
  //   "Claimable_Refunds_ResolvedNoWinners",
  // ];

  useEffect(()=>{


    // setIds(id)
    (async()=>{

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
   try{
//  this is new url = https://api.thegraph.com/subgraphs/name/chinkauchenna2021/double_app
    const result = await axios.post('https://api.thegraph.com/subgraphs/name/chinkauchenna2021/doubledice_playground',{
    query:`{
        virtualFloors(first: 100,orderBy: tCreated, orderDirection: asc) {
          id
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
    }`
    })

   
      setAvailableBet(result.data.data.virtualFloors)
    }catch(e){
     console.log("not available")
    }



})();

  


  },[])
  
  const router = useRouter();

const convertTime = (bettime:number)=>{
  let timeConverted =   new Date(1970 , 0 , 1);
  // console.log(timeConverted)
    timeConverted.setSeconds(bettime)
  return timeConverted;
}

const selectedBet = (opponents:Oponents[],id:string)=>{
  const title = availabelOponents(opponents);
  console.log(opponents)
  setOpponentsData(opponents);
  setTitle(title);
}


const availabelOponents = (obj:Oponents[]):string =>{
  const value = obj.map((o)=>o.title).join(' vs ')
  return  value.toString();
}


function checkStatus(tClose: any , tResultSetMin : any):string{
 let date = new Date();
 let seconds = Math.floor(date.getTime() / 1000);
 if(seconds < tClose){

  return ("Live");
 }else if ((seconds > tClose) && (seconds < tResultSetMin)){

  return ("Awaiting result")
 }else{

  return ('Bet Closed')
 }
}

  return (
    <SC.Container>
      <div>
        <SC.Title>Choose Free TO Play Games </SC.Title>

        <SC.TableContainer>
          <table id="customers">
            <thead>
              <tr>
                <th>Events</th>
                <th>Sategory/Subcategory</th>
                <th>Result Time</th>
                <th>Pool</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              { (availableBet?.length == 0)? "Loading":
               availableBet?.map(bets=>{
                 return(
                  <Link  key={bets.id} href={`/PlayerRoom/${bets.id}`}>
                    <tr key={bets.id} onClick={()=>selectedBet(bets.opponents,bets.id)}>
                      <td>{availabelOponents(bets.opponents)}</td>
                      <td>{bets.subcategory.id}</td>
                      {/* <td>{convertTime(Number(bets.tClose)).toString()}</td> */}
                      <td>{convertTime(Number(bets.tResultSetMin)).toLocaleString()}</td>
                      <td>{`${Number(bets.totalSupply)} ${bets.paymentToken.symbol}`}</td>
                      <td>{checkStatus(bets.tClose ,bets.tResultSetMin ) }</td>

                    </tr>  
                    </Link>
                 )
               })
              }
  
            </tbody>
          </table>
        </SC.TableContainer>

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
          router.push("/");
        }}>
        Back
      </SC.CreateNewSession>
      </SC.ButtonContainer>
    </SC.Container>
  );
};

export default EnterFreeToPlayRoom;
