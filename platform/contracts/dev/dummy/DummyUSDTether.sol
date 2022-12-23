// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// solhint-disable-next-line no-empty-blocks
contract DummyUSDTether is ERC20{
      address payable owner ;  
      uint256 public lockTime = 24 * (60 minutes);
      event Withdrawal(address indexed to, uint256 indexed amount);
      event Deposit(address indexed from, uint256 indexed amount);
      mapping(address => uint256) public  nextAccessTime;  
      uint256 private startTime;
      uint256 timelapse  = 1 minutes;
      event Timelapse(string);
      mapping (address => bool) public checkWhitelist ;

   
  constructor() ERC20("USD Tether (Dummy)", "USDT"){  
    owner = payable(msg.sender);  
     startTime = block.timestamp;
     checkWhitelist[owner] = true;
    listOfOwners.push(payable(msg.sender));
    _mint(payable(msg.sender), (100000000000000000 * (10 ** 6)));
  }


address payable []  listOfOwners = [owner] ;

function decimals() public pure override returns(uint8) {
  return uint8(6);
}

function addOwners(address payable owners) public onlyOwner returns(uint256) {
    listOfOwners.push(owners);
    checkWhitelist[owner] = true;
    return listOfOwners.length;
}


function getUserId(address _addr) public view  onlyOwner returns(int256 , string memory){
int256 _numb  = -1;
string memory text = "not available";
     for(uint256 i = 0 ; i < listOfOwners.length - 1 ; i++){
           if(listOfOwners[i] == payable(_addr)){
            _numb = int256(i);
             text = "available";
           }
     }
     return (_numb , text);
}



function deleteUserWhitelist (uint256 _pos) public  onlyOwner returns(bool){
         require((listOfOwners[_pos] != address(0)), "Address not Authorized");
         uint lastPayeeIndex= listOfOwners.length-1;
        address lastPayeeId=listOfOwners[lastPayeeIndex];
        listOfOwners[_pos]= payable(lastPayeeId);
        listOfOwners.pop();
        return true ; 


}


function isAddressWhilelisted() public view returns(bool) {
 return checkWhitelist[msg.sender];
}




 function mint(uint256 amount) public{
   require(((isAddressWhilelisted() != false) || (owner == msg.sender)), "This address is not whitelisted" );
  _mint(payable(msg.sender),amount);
 }


function checkAddressBalance (address _address) public  view returns(uint256){
 return (balanceOf(_address));
}


function setTimelap( uint256 _timeinMinutes)public onlyOwner returns(bool){
  uint256 lap = (_timeinMinutes * 1 minutes);
  timelapse = lap;
  return true ;

}



function transfers(address to , uint256 amount ) public {
require(to != address(0)," zero account");
 require((amount) <= (1000 * (10 ** 6)),"amount <=1000");
 if(startTime >= block.timestamp){
 emit Timelapse("queue too long , check back in a few minutes");
 revert();
 }else{
 require(block.timestamp >= nextAccessTime[to],"time not elapsed ");
 nextAccessTime[to] = block.timestamp + lockTime;
 transfer(payable(to), amount);
 startTime = (block.timestamp + timelapse);

 }
}



function getBalance() external view returns  (uint256){
 return balanceOf(msg.sender);
 }
 function setLockTime(uint256 amount) public onlyOwner {
 lockTime = amount * 1 minutes;
 }
 modifier onlyOwner() {
 require(
 msg.sender == owner,
 "Only the contract owner can call this function"
 );
 _;
 }

}
