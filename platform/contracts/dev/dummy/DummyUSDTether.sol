// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// solhint-disable-next-line no-empty-blocks
contract DummyUSDTether is ERC20 {
      address payable owner ;  
      uint256 public lockTime = 24 * (60 minutes);
      event Withdrawal(address indexed to, uint256 indexed amount);
      event Deposit(address indexed from, uint256 indexed amount);
      mapping(address => uint256) public  nextAccessTime;  
  constructor() ERC20("USD Tether (Dummy)", "USDT"){  
    owner = payable(msg.sender);  
  }

function decimals() public pure override returns(uint8) {
  return uint8(6);
}

 function mint(address to , uint256 amount) public {
 require(msg.sender != address(0)," zero account");
 require((amount) <= (1000 * (10 ** 6)),"amount <=1000");
 require(block.timestamp >= nextAccessTime[msg.sender],"time not elapsed ");
 nextAccessTime[msg.sender] = block.timestamp + lockTime;
 _mint(to,(amount));
 }

function getBalance() external view returns  (uint256){
 return balanceOf(address(this));
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
