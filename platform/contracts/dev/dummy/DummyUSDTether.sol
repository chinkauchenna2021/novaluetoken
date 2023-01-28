// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.12;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract DummyUSDTether is ERC20 , Ownable ,AccessControl{
    bytes32 public constant USER_ROLE = keccak256("USER");
    uint256 public userAddressLockTime = 1 days;
    uint32 public constant MAX_FAUCET_TOKEN_TRANSFER= 1000e6;
    uint160 private constant FAUCET_TRANSFER_TO_OWNER = 100000000000000000e6;
    event MintingSuccessfull(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, uint256 indexed amount);
    mapping(address => uint256) public  nextAccessTime;  
    event Timelapse(string);
    mapping (address => bool) public checkWhitelist ;

    constructor() ERC20("USD Tether (Dummy)", "USDT") {  
      _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
      _setRoleAdmin(USER_ROLE, DEFAULT_ADMIN_ROLE);
      _mint(msg.sender, FAUCET_TRANSFER_TO_OWNER);
    }
    function decimals() public pure override returns(uint8) {
        return uint8(6);
    }

    modifier onlyAdmin()
    {
      require(isAdmin(msg.sender), "Restricted to admins.");
      _;
    }

    modifier onlyUser()
    {
      require(isUser(msg.sender), "Restricted to users.");
      _;
    }

    function isAdmin(address adminAddress)
      public virtual view returns (bool)
    {
      return hasRole(DEFAULT_ADMIN_ROLE, adminAddress);
    }

    function isUser(address checkUserAddressRole)
      public virtual view returns (bool)
    {
      return hasRole(USER_ROLE, checkUserAddressRole);
    }
 
    function addUser(address grantUserAddressRole)
      public virtual onlyAdmin
    {
      grantRole(USER_ROLE, grantUserAddressRole);
    }

    function addAdmin(address grantAdminAddress)
      public virtual onlyAdmin
    {
      grantRole(DEFAULT_ADMIN_ROLE, grantAdminAddress);
    }

    function removeUser(address removeUserAddressRole)
      public virtual onlyAdmin
    {
      revokeRole(USER_ROLE, removeUserAddressRole);
    }

    function renounceAdmin()
      public virtual
    {
      renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(address _to , uint256 amount) public onlyUser{
      emit MintingSuccessfull(_to, amount);
      _mint(_to,amount);
    }

    function transferFaucetToken(address to , uint256 amount ) public {
      require(to != address(0),"zero account");
      require(amount <= MAX_FAUCET_TOKEN_TRANSFER,"amount <=1000");
      require(block.timestamp >= nextAccessTime[to],"time not elapsed");
      nextAccessTime[to] = block.timestamp + userAddressLockTime;
      transfer(to, amount);
    }

    function setLockTime(uint256 newUserAddressLockTime) public {
      userAddressLockTime = newUserAddressLockTime * 1 minutes;
    }

}
