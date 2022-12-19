import assert from 'assert';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import {
  deployDoubleDice,
  deployDummyUSDCoin,
  deployDummyUSDTether,
  deployDummyWrappedBTC,
  deployGraphHelper,
  toFp18
} from '../helpers';
import {
  DummyUSDCoin,
  DummyUSDCoin__factory,
  DummyWrappedBTC,
  DummyWrappedBTC__factory,
  DummyUSDTether,
  DummyUSDTether__factory
} from '../lib/contracts';

const {
  CHAIN_ID,
  OWNER_ADDRESS,
  INIT_TOKEN_METADATA_URI_TEMPLATE,
  INIT_CONTRACT_URI,
  INIT_PROTOCOL_FEE_RATE,
  INIT_PROTOCOL_FEE_BENEFICIARY,
  DEPLOYED_USDC_ADDRESS = '',
  DEPLOYED_WBTC_ADDRESS = '',
  DEPLOYED_USDT_ADDRESS = '',
  SKIP_DEPLOY_GRAPH_HELPER = ''
} = process.env;

async function main() {

  assert(CHAIN_ID, 'Error: CHAIN_ID');
  assert(OWNER_ADDRESS, 'Error: OWNER_ADDRESS');
  assert(INIT_TOKEN_METADATA_URI_TEMPLATE, 'Error: INIT_TOKEN_METADATA_URI_TEMPLATE');
  assert(INIT_PROTOCOL_FEE_RATE, 'Error: INIT_PROTOCOL_FEE_RATE');
  assert(INIT_PROTOCOL_FEE_BENEFICIARY, 'Error: INIT_PROTOCOL_FEE_BENEFICIARY');
  assert(INIT_CONTRACT_URI, 'Error: INIT_CONTRACT_URI');

  const { chainId } = await ethers.provider.getNetwork();
  assert(parseInt(CHAIN_ID) === chainId, `${CHAIN_ID} !== ${chainId}; wrong .env config?`);

  const deployer = await ethers.getSigner(OWNER_ADDRESS);

  let tokenUSDC: DummyUSDCoin;
  if (DEPLOYED_USDC_ADDRESS) {
    tokenUSDC = DummyUSDCoin__factory.connect(DEPLOYED_USDC_ADDRESS, deployer);
  } else {
    tokenUSDC = await deployDummyUSDCoin(deployer);
  }

  let tokenWBTC: DummyWrappedBTC;
  if (DEPLOYED_WBTC_ADDRESS) {
    tokenWBTC = DummyWrappedBTC__factory.connect(DEPLOYED_WBTC_ADDRESS, deployer);
  } else {
    tokenWBTC = await deployDummyWrappedBTC(deployer);
  }

  let tokenUSDT: DummyUSDTether;
  if (DEPLOYED_USDT_ADDRESS) {
    tokenUSDT = DummyUSDTether__factory.connect(DEPLOYED_USDT_ADDRESS, deployer);
  } else {
    tokenUSDT = await deployDummyUSDTether(deployer);
  }




  const contract = await deployDoubleDice({
    deployer,
    deployArgs: [],
    initializeArgs: [
      {
        tokenMetadataUriTemplate: INIT_TOKEN_METADATA_URI_TEMPLATE,
        protocolFeeRate_e18: toFp18(INIT_PROTOCOL_FEE_RATE),
        protocolFeeBeneficiary: INIT_PROTOCOL_FEE_BENEFICIARY,
        contractURI: INIT_CONTRACT_URI,
      },
      tokenUSDT.address,
    ]
  });
   console.log(`main contract address ${contract.address}`)
  console.log(`Whitelisting USDC@${tokenUSDC.address} on DoubleDice contract`);
  await ((await contract.updatePaymentTokenWhitelist(tokenUSDC.address, true)).wait());

  console.log(`Whitelisting WBTC@${tokenWBTC.address} on DoubleDice contract`);
  await ((await contract.updatePaymentTokenWhitelist(tokenWBTC.address, true)).wait());

  console.log(`Whitelisting USDT@${tokenUSDT.address} on DoubleDice contract`);
  await ((await contract.updatePaymentTokenWhitelist(tokenUSDT.address, true)).wait());


  // Read ProxyAdmin address off the DD contract
  // See https://eips.ethereum.org/EIPS/eip-1967#admin-address
  const ADMIN_SLOT = ethers.utils.hexZeroPad(BigNumber.from(ethers.utils.keccak256(ethers.utils.toUtf8Bytes('eip1967.proxy.admin'))).sub(1).toHexString(), 32);
  const storedAdminSlotValue = await ethers.provider.getStorageAt(contract.address, ADMIN_SLOT);
  const fixedStoredAdminSlotValue = ethers.utils.hexZeroPad(storedAdminSlotValue, 32); // should be a bytes32, but sometimes it isn't, so we fix it
  const proxyAdminAddress = ethers.utils.hexDataSlice(fixedStoredAdminSlotValue, 12);

  if (!(/^(true|yes|1)$/i.test(SKIP_DEPLOY_GRAPH_HELPER))) {
  let Graphhelper =   await deployGraphHelper({ deployer, proxyAdminAddress });
  console.log(`This is the GraphHelper  address ${Graphhelper.address} `)

  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
