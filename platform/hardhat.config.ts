import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import dotenv from 'dotenv';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import { HardhatUserConfig } from 'hardhat/types';
import 'solidity-coverage';
import './scripts/write-contract-size-report';

// // Commented out by default to avoid cyclic dependency (script relies on TypeChain, and TypeChain relies on this file)
// import './scripts/decode-doubledice-custom-error';


const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

const {
  PROVIDER_URL,
  OWNER_PRIVATE_KEY,
  MAINNET_TESTCOIN_DEPLOYER_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
} = process.env;

const accounts = [
  ...(OWNER_PRIVATE_KEY ? [OWNER_PRIVATE_KEY] : []),
  ...(MAINNET_TESTCOIN_DEPLOYER_PRIVATE_KEY ? [MAINNET_TESTCOIN_DEPLOYER_PRIVATE_KEY] : []),
];

const config: HardhatUserConfig = {
  abiExporter: {
    path: './generated/abi',
    clear: true,
    flat: true,
    only: [
      ':DoubleDice$',
      ':DummyERC20$',
      ':DummyUSDCoin$',
      ':GraphHelper$',
      ':IERC20Metadata$',
    ],
    runOnCompile: true,
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      chainId: 1337,
      url: 'http://localhost:8545',
    },
    docker: {
      chainId: 1337,
      url: 'http://ganache-cli:8545',
    },
    rinkeby: {
      url: PROVIDER_URL,
      accounts,
      chainId: 4,
    },
    mumbai: {
      url: PROVIDER_URL,
      accounts,
      gasPrice: 35000000000,
      chainId: 80001,
    },
    polygon: {
      url: PROVIDER_URL,
      accounts,
      chainId: 137,
      timeout: 60 * 60 * 1000 // 1 hour
    }
  },
  solidity: {
    version: '0.8.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  typechain: {
    externalArtifacts: [
      './openzeppelin-contracts/build/contracts/ProxyAdmin.json',
      './openzeppelin-contracts/build/contracts/TransparentUpgradeableProxy.json',
    ],
    outDir: 'lib/generated/typechain-types'
  },
  gasReporter: {
    outputFile: 'gas-report.txt',
    noColors: true,
    excludeContracts: ['other/'],
  },
  etherscan: {
    apiKey:{
      polygonMumbai:  ETHERSCAN_API_KEY
    },
  },
};

export default config;