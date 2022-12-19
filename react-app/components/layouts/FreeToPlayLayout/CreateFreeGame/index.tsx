import React, { useCallback, useMemo, useState  , useEffect} from "react";
import { useAccount } from "contexts/AccountContext";
import { BigNumber, ethers  ,BigNumberish } from "ethers";
import { useRouter } from "next/router";
import { $ } from "utils/helpers";
import { toTimestamp } from "utils/toTimestamp";
import CreateSessionInput from "../FreeToPlayInput";
import { BigNumber as BigDecimal } from 'bignumber.js';
import Link from "next/link";
import { Opponent } from "../../../layouts/doubledice/platform//lib/graph";
import {
  DoubleDice as DoubleDiceContract,
  DoubleDice__factory,
  encodeVirtualFloorMetadata,
  RoomEventInfo,
  VirtualFloorCreationParamsStruct,
  VirtualFloorMetadataV1Struct
} from '../../../layouts/doubledice/platform//lib/contracts'
import DoubleDices  from "../../../layouts/doubledice/platform/generated/abi/DoubleDice.json";
import { validateRoomEventInfo } from '../../../layouts/doubledice/platform/lib/metadata'
import * as SC from "./styles";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Graphhelper } from "components/libs/Graphhelper";
import { Clasical_Abi } from "components/libs/Clasical_Abi";
import {MAIN_CONTRACT_ADDRESS} from '../../../main';
import axios from "axios";



const  generateRandomVirtualFloorId = () =>
  ethers.utils.hexConcat([
    '0x01',
    ethers.utils.hexlify(ethers.utils.randomBytes(8)),
    '0x00',
    '0x00000000',
  ])




const CreateFreeGame = () => {

  const tokenAddress= "0x8E723467f28B80e5016Ce72a90fe5bE16B94D698";
  const [val,setVal]=useState([{title:'Oponents Title',image:'Oponents Image'}]);
  const [outCome,setOutcome]=useState([{title:"Outcome Title"}]);
  const [resultSource,setResultSource]=useState([{title:'Result Source Title',url:'Result Sources Url'}]);

  const [providers , setProviders] = useState<ethers.providers.Web3Provider>();
  const [walletAddress , setWalletAddress] = useState<string>();
  const [signers , setSigners] = useState<JsonRpcSigner>();
  const [contract , setContract] = useState<ethers.Contract | DoubleDiceContract>()
  const [availableBet , setAvailableBet]  = useState<any[]>();
  const [title , setTitle] = useState<string>("Click on Available bets to commit");
  const [opponentsData , setOpponentsData]  = useState<Opponent[]>();

  const [betIndex , setBetIndex] = useState<string>();

  const [betValueIndex , setBetValueIndex] = useState<string>()
  const [resultVisibility , setResultVisibility]  = useState<boolean>()
  const router = useRouter();

  const initialVfState = [
    "Active_ResultChallenged",
    "Active_ResultNone",
    "Active_ResultSet",
    "Claimable_Payouts",
    "Claimable_Refunds_Flagged",
    "Claimable_Refunds_ResolvableNever",
    "Claimable_Refunds_ResolvedNoWinners",
  ];


  const [roomInfo , setRoomInfo] = useState<RoomEventInfo>({
    title:"",
    description:"",
    isListed: true,
    category: "",
    subcategory:"",
    opponents: [],
    outcomes: [],
    resultSources:[{title:'team1',url:'https://www.google.com'}],
    discordChannelId: '12345',
    extraData: '0x'  
  });





useEffect(()=>{
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



  let wallet = walletAddress?.toLowerCase();
  let body =  { 
      query: `
          query {
            virtualFloors(first: 100,orderBy: tCreated, orderDirection: asc, where:{owner: "${wallet}" }) {
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
              owner{
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
  console.log(result)

})()
















},[walletAddress])






const [params, setParams] = useState<VirtualFloorCreationParamsStruct>({
  vfId: 0,
  betaOpen_e18: 10,
  totalFeeRate_e18: 0,
  tOpen:0,
  tClose: 0,
  tResolve: 0,
  nOutcomes: 2,
  bonusAmount: "0",
  paymentToken:tokenAddress,
  optionalMinCommitmentAmount: 0,
  optionalMaxCommitmentAmount: 0,
  metadata:"",
  creator:""
} as unknown as VirtualFloorCreationParamsStruct);




  const handleVFCreation = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
    e.preventDefault();
      // nullable because otherwise property won't be picked up during setup; ToDo: Find a better way



let {
  tOpen,
  tClose,
  tResolve,
  nOutcomes,
  bonusAmount,
  optionalMinCommitmentAmount,
  optionalMaxCommitmentAmount,
 } = params as any;

 let betaOpen = 10

 let totalFeeRatePercent = 2.5

    //  let  opponents: RoomEventInfo['opponents'] = [{title:'team1',image:'https://www.google.com'},{title:'team2',image:'https://www.google.com'}]
    
     let  outcomes: RoomEventInfo['outcomes'] = [{title:'team1'},{title:'team2'}]
    
     
    
        const metadata: RoomEventInfo = {
          title: roomInfo?.title,
          description: roomInfo?.description,
          isListed:true,
          category: roomInfo?.category,
          subcategory: roomInfo?.subcategory,
          opponents:val,
          outcomes:outCome,
          resultSources:resultSource,
          discordChannelId: '12345',
          extraData: '0x'
        }


        if (!validateRoomEventInfo(metadata)) {
          console.error(validateRoomEventInfo.errors)
          alert(JSON.stringify(validateRoomEventInfo.errors))
          return
        }
    





        // const vfId = generateRandomVirtualFloorId()
    
        // 5.0 => (5.0 * 1e6) * 1e12 = 5e18
        // Note: If beta has more than 6 decimal places precision, VF-creation will fail
        const betaOpen_e18 = BigNumber.from(10).pow(12).mul(betaOpen * 1_000000)
    
        // 2.5% => ((2.5 / 100) * 1e4) * 1e18 = 0.025e18
        // Note: If totalFeeRate has more than 4 decimal places precision, VF-creation will fail
        const totalFeeRate_e18 = BigNumber.from(10).pow(14).mul(totalFeeRatePercent * 100)
    
         tOpen = new Date(tOpen).getTime() / 1000;
         tClose = new Date(tClose).getTime() / 1000;
         tResolve = new Date(tResolve).getTime() / 1000;
        tOpen = tOpen - (tOpen % 60)
        tClose = tClose - (tClose % 60)
        tResolve = tResolve - (tResolve % 60)
      const vfId = generateRandomVirtualFloorId()
      // const vfId = BigNumber.from(ethers.utils.randomBytes(8)).shl(5 * 8)
  //     console.log(tOpen)
  //  console.log(Number(vfId))
// let c = encodeVirtualFloorMetadata(metadata);
// console.log(c);
// console.log("for bonusAmount")
// console.log(Number(ethers.utils.parseUnits(bonusAmount,6)))

const toFixedPointEthersBigNumber = (value: number, decimals: number): BigNumber =>
  BigNumber.from(new BigDecimal(value).times(new BigDecimal(10).pow(decimals)).toString())


const paramss = {
  vfId,
  betaOpen_e18,
  totalFeeRate_e18,
  tOpen,
  tClose,
  tResolve,
  nOutcomes,
  paymentToken:tokenAddress,
  bonusAmount: toFixedPointEthersBigNumber(bonusAmount,6),
  optionalMinCommitmentAmount,
  optionalMaxCommitmentAmount,
  metadata: encodeVirtualFloorMetadata(metadata),
        }

console.log(paramss)


// eslint-disable-next-line space-before-function-paren
try {
          // const increaseGasLimit = (estimatedGasLimit: BigNumber | undefined) => {
          //   return estimatedGasLimit?.mul(estimatedGasLimit).div(100) // increase by 30%
          // }
          
          // const estimatedGas = await contract?.estimateGas.createVirtualFloor(paramss)
    
          const tx = await  contract?.createVirtualFloor(paramss,{gasLimit:320000});

          console.log("the transaction hash is done")
          console.log(tx)
          const { hash } = tx
          const txUrl = `https://mumbai.polygonscan.com/tx/${hash}`
          console.log(`Sent ${txUrl}`)
          await tx.wait()
          console.log(`⛏ Mined ${txUrl}`)
        }catch(e){

          console.log(e)
        }

    }

  const disabledPreviousDates = useMemo(() => {
    const today = new Date();
    let dd, mm, yyyy;
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const handleAdd=()=>{
      setVal(v=>[...v,{title:'Oponents Title',image:'Oponents Image'}])
  }
  const handleChange=(onChangeValue: React.ChangeEvent<HTMLInputElement>,i:number)=>{
    onChangeValue.preventDefault()
    const inputdata=[...val]
if(onChangeValue.target.name =="title1"){
  // console.log(onChangeValue.target.name)
  inputdata[i]={title:onChangeValue.target.value,image:val[i].image};
  setVal(d=>inputdata)
   
}else if(onChangeValue.target.name == "title2"){
  // console.log(onChangeValue.target.name)
  inputdata[i]={title:val[i].title,image:onChangeValue.target.value};
  setVal(d=>inputdata)

}

    // console.log(val)
  }
  
  const handleDelete=(i:number)=>{
      const deletVal=[...val]
      deletVal.splice(i,1)
      setVal(deletVal)  
  }


  

  const handleAddOutcome=()=>{
      setOutcome(v=>[...v,{title:"Outcome Title"}])
  }
  const handleChangeOutcome=(onChangeValues: React.ChangeEvent<HTMLInputElement>,i:number)=>{
    onChangeValues.preventDefault()
    const inputdata=[...outCome]
    inputdata[i]={title:onChangeValues.target.value};
    setOutcome(inputdata)

    // console.log(outCome)
  }
  const handleDeleteOutcome=(i:number)=>{
      const deletVal=[...outCome]
      deletVal.splice(i,1)
      setOutcome(deletVal)  
  }




  const handleAddSource=()=>{
    setResultSource(v=>[...v,{title:'Result Source Title',url:'Result Sources Url'}])
}
const handleSource=(onChangeValue: React.ChangeEvent<HTMLInputElement>,i:number)=>{
  onChangeValue.preventDefault()
  const inputdata=[...resultSource]
if(onChangeValue.target.name =="title1"){
inputdata[i]={title:onChangeValue.target.value , url:resultSource[i].url};
setResultSource(d=>inputdata)
 
}else if(onChangeValue.target.name == "title2"){
inputdata[i]={title:resultSource[i].title,url:onChangeValue.target.value};
setResultSource(d=>inputdata)

}

  // console.log(resultSource)
}

const handleDeleteSource=(i:number)=>{
    const deletVal=[...resultSource]
    deletVal.splice(i,1)
    setResultSource(deletVal)  
}


  function availableGames(): void {
    router.push('/enterFreeToPlay')
  }

























  const convertTime = (bettime:number)=>{
    let timeConverted =   new Date(1970 , 0 , 1);
    // console.log(timeConverted)
      timeConverted.setSeconds(bettime)
    return timeConverted;
  }
  
  const selectedBet = async (opponents:Opponent[],id:string)=>{
    const title = availabelOponents(opponents);
    setOpponentsData(opponents);
    setTitle(title);
    try{
    let tx = await contract?.getVirtualFloorState(id); 
    tx = tx -1;
     let realState = initialVfState[tx];   
    }catch(e){



    }



  }

  const availabelOponents = (obj:any[]):string =>{
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



  const outcomesData = (data:any[])=>{
      let dataColector:any = {};
      data.map(d=>{
         dataColector[d.title] = Number(d.totalSupply)
         

      })
      if(Object.keys(dataColector).length === 0 ){
          return ("No bet yet")
        
      }
      
      return (JSON.stringify(dataColector))
  }


const handleSetResult = async (index:any)=>{
// let title = singleBet.map((d:any)=>d.title)
//  let id = singleBet.map((d:any)=>{

//   return d.id.slice(-1);
//  })
 setBetValueIndex(index)
 setResultVisibility(true);
//  console.log({id,title,bool:true});
}

const addResult =  async()=>{
//  console.log(betIndex,betValueIndex)
try{
  const tx = await contract?.setResult(BigNumber.from(betValueIndex),BigNumber.from(betIndex),{gasLimit:3200000})
 const {hash} = tx
  await tx.wait();
  if(hash){
    console.log(hash)
  }

}catch(e){

  console.log(e)
}


}

  return (
    <>
      <div style={{display:"flex",justifyContent:"flex-end",width:"100%",paddingTop:"50px"}}>

       <SC.Button style={{width:"25%"}} onClick={()=>availableGames()}>Enter Room</SC.Button>

      </div>
    <SC.Form >

    
      <SC.Title>Create Free Game  </SC.Title>
      <SC.InputGrid>
      <CreateSessionInput
          type="number"
          value={params.betaOpen_e18}
          min={"10"}
          step={"0.000001"}
           onChange={(e) => setParams((prevState:any) => ({ ...prevState, betaOpen: e.target.value }))}
          label="betaOpen: "
        />
        <CreateSessionInput
          type="text"
          value={params.paymentToken}
          onChange={(e) => setParams((prevState:any) => ({ ...prevState, paymentToken: e.target.value }))}
          label="Payment Token: "
        />
        <CreateSessionInput
          type="number"
          value={params.totalFeeRate_e18}
          onChange={(e) =>
            setParams((prevState:any) => ({
              ...prevState,
              totalFeeRate_e18:
                e.target.value <= 100 && e.target.value >= 0 ? e.target.value : prevState.totalFeeRate_e18,
            }))
          }
          label="Total fee rate in %: "
        />
        <CreateSessionInput
          type="datetime-local"
          value={params.tOpen}
          min={disabledPreviousDates}
          onChange={(e) => setParams((prevState:any) => ({ ...prevState, tOpen: e.target.value }))}
          label="tOpen: "
        />
       
        <CreateSessionInput
          type="datetime-local"
          min={disabledPreviousDates}
          value={params.tClose}
          onChange={(e) => setParams((prevState:any) => ({ ...prevState, tClose: e.target.value }))}
          label=" tClose: "
        />
        <CreateSessionInput
          type="datetime-local"
          min={disabledPreviousDates}
          value={params.tResolve}
          onChange={(e) => setParams((prevState:any) => ({ ...prevState, tResolve: e.target.value }))}
          label="tResolve: "
        />

        <CreateSessionInput
          type="number"
          value={params.nOutcomes}
          onChange={(e) => setParams((prevState:any) => ({ ...prevState, nOutcomes: e.target.value }))}
          label="Number of outcomes: "
        />
        <CreateSessionInput
          type="number"
          value={params.optionalMinCommitmentAmount}
          onChange={(e) => setParams((prevState:any) => ({ ...prevState, optionalMinCommitmentAmount: Number(e.target.value) }))}
          label="Min commitment amount (optional): "
        />
        <CreateSessionInput
          type="number"
          value={params.optionalMaxCommitmentAmount}
          onChange={(e) => setParams((prevState:any) => ({ ...prevState, optionalMaxCommitmentAmount: Number(e.target.value) }))}
          label="Max commitment amount (optional): "
        />
        <CreateSessionInput
          type="number"
          value={params.bonusAmount}
          onChange={(e) => setParams((prevState:any) => ({ ...prevState, bonusAmount: e.target.value }))}
          label="nOutcomes : "
        />

       <CreateSessionInput
          type="text"
          value={roomInfo.title}
          onChange={(e) => setRoomInfo((prevState) => ({ ...prevState, title: e.target.value }))}
          label="Title : "
        />



       <div >
           <div>description:</div>
             <textarea cols={60} rows={2}  value={roomInfo.description}
          onChange={(e) => setRoomInfo((prevState) => ({ ...prevState, description: e.target.value }))}  ></textarea>
       </div>

        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
        <div>
            <label>Category</label>
        <select style={{width:'150px',marginLeft:'10px'}}     value={roomInfo.category}
          onChange={(e) => setRoomInfo((prevState) => ({ ...prevState, category: e.target.value }))}>
              <option value="sport">Choose Category</option>
            <option value="sport">Sport</option>
            <option value="other">other</option>
        </select>
        </div>
        <div>
        
            <label>Sub Category</label>
        <select style={{width:'150px',marginLeft:'10px'}}    value={roomInfo.subcategory}
          onChange={(e) => setRoomInfo((prevState) => ({ ...prevState, subcategory: e.target.value }))}>
              <option value="sport">Choose Subcategory</option>
            <option value="football">football</option>
            <option value="other">other</option>
        </select>
        </div>
        </div>
    
      </SC.InputGrid>


      <SC.Subtitle>Opponents</SC.Subtitle>

      <div style={{display:'flex',flexWrap:'wrap'}}>
      {val.map((data,i)=>{
            return(
               <div>
                    <input name="title1" value={data.title} onChange={e=>handleChange(e,i)} />
                    <input name="title2" value={data.image} onChange={e=>handleChange(e,i)} />
                    <button onClick={()=>handleDelete(i)}>x</button>
               </div>
            )
        })}
          <SC.Button  onClick={()=>handleAdd()}>Add Opponents</SC.Button>
      </div>



      <SC.Subtitle>Outcome</SC.Subtitle>

      <div style={{display:'flex',flexWrap:'wrap'}}>
      {outCome.map((datas,i)=>{
            return(
               <div>
                    <input value={datas.title} onChange={e=>handleChangeOutcome(e,i)} />
                    <button onClick={()=>handleDeleteOutcome(i)}>x</button>
               </div>
            )
        })}
          <SC.Button  onClick={handleAddOutcome}>Add outcome</SC.Button>
      </div>


      <SC.Subtitle>Result Sources</SC.Subtitle>

      <div style={{display:'flex',flexWrap:'wrap'}}>
      {resultSource.map((data,i)=>{
            return(
               <div>
                    <input name="title1" value={data.title} onChange={e=>handleSource(e,i)} />
                    <input name="title2" value={data.url} onChange={e=>handleSource(e,i)} />
                    <button onClick={()=>handleDeleteSource(i)}>x</button>
               </div>
            )
        })}
          <SC.Button  onClick={()=>handleAddSource()}>Add Opponents</SC.Button>
      </div>


      <SC.Button  onClick={(e)=>handleVFCreation(e)}>Submit</SC.Button>
    </SC.Form>
    



{ resultVisibility &&

   (<SC.TableContainer style={{margin:"10px auto",width:"60%"}}>
   <SC.PlayerContainer>
         <div style={{width:'100%',minHeight:'60px',display:'flex',justifyContent:"center",alignItems:"center",fontSize:"20px",fontWeight:"bold"}}> 
           Set Result                 
         </div>
          <div>
          <div>
   
          <div style={{display:'flex',flexDirection:'column',marginTop:'3px'}}>
          <label style={{margin:'5px 0px'}}>VirtualFloor Index</label>
          <SC.Input
          type="text"
          value={betValueIndex}
          onChange={(e)=>setBetValueIndex(e.target.value)}
        />


            <label style={{margin:'5px 0px'}}>Choose Options</label>
           <select onChange={(e)=>setBetIndex(e.target.value)} style={{height:'28px',borderRadius:'10px'}}>
            <option>No bet Available</option>
            {opponentsData?.map((data)=>{ 
                return<option value={data.id.slice(-1)} >{data.title}</option>         
            })}
           </select>
          </div>

        <SC.Button onClick={()=>addResult()}>Make Bet</SC.Button>
        </div>
          </div>
</SC.PlayerContainer>



        </SC.TableContainer>)}
















    <SC.Container  style={{marginTop:"300px",paddingLeft:"100px"}}>
      <div>

        <SC.TableContainer>
        <SC.Title>Your Created Bets </SC.Title>
          <table id="customers">
            <thead>
              <tr>
                <th>Events</th>
                <th>Sategory/Subcategory</th>
                <th>Result Time</th>
                {/* <th>Pool</th> */}
                <th>Status</th>
                <th>Bet History</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              { (availableBet?.length == 0)? "Loading":
               availableBet?.map(bets=>{
              
                 return(
               
                    <tr key={bets.id} onClick={()=>selectedBet(bets.opponents,bets.id)}>
                      <td>{availabelOponents(bets.opponents)}</td>
                      <td>{bets.subcategory.id}</td>
                      {/* <td>{convertTime(Number(bets.tClose)).toString()}</td> */}
                      <td>{convertTime(Number(bets.tResultSetMin)).toLocaleString()}</td>
                      {/* <td>{`${Number(bets.totalSupply)} ${bets.paymentToken.symbol}`}</td> */}
                      <td>{checkStatus(bets.tClose ,bets.tResultSetMin ) }</td>
                      <td>{outcomesData(bets.outcomes).toString()}</td>
                      <td>{((checkStatus(bets.tClose ,bets.tResultSetMin ) == "Awaiting result")) || ((checkStatus(bets.tClose ,bets.tResultSetMin ) == "Bet Closed"))? ( <SC.Button  onClick={()=>handleSetResult(bets.id)}>Set Result</SC.Button>):"" }</td>

                    </tr>  
                 )
               })
              }
  
            </tbody>
          </table>
        </SC.TableContainer>

      </div>
    </SC.Container>



















    </>
  );
};

export default CreateFreeGame ;




