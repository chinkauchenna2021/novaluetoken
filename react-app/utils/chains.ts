import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { AddEthereumChainParameter } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import networkConfig from "config/networkConfig";
import { ethers } from "ethers";
// import { EncodedVirtualFloorMetadataStruct } from "lib/generated/typechain-types/artifacts/contracts/DoubleDiceProtocol";
import { convertNumToHexdecimal } from "utils/helpers";

export const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

export const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

export interface BasicChainInformation {
  urls: string[];
  name: string;
}

export interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: string;
}

export type SupportedWalletsT = MetaMask | WalletConnect | Network;

export enum SupportedStateWalletEnum {
  METAMASK = "MetaMask",
  WALLET_CONNECT = "WalletConnect",
  NETWORK = "Network",
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export const urlArr = {
  [80001]: "https://rpc-mumbai.maticvigil.com",

};

export const getConnectedWalletName = (connector: SupportedWalletsT): SupportedStateWalletEnum => {
  if (connector instanceof WalletConnect) return SupportedStateWalletEnum.WALLET_CONNECT;
  else if (connector instanceof Network) return SupportedStateWalletEnum.NETWORK;
  else return SupportedStateWalletEnum.METAMASK;
};

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: [chainInformation.blockExplorerUrls],
    };
  } else {
    return chainId;
  }
}

export const switchNetwork = async () => {
  if (typeof window.ethereum !== "undefined") {
    // @ts-ignore
    try{
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: `0x${convertNumToHexdecimal(networkConfig.networkId)}`,
          },
        ],
      });

    }catch(e){

     console.log(e);
    }
  }
};

export const addNetwork = async (id: number) => {
  let networkData;

  switch (id) {
    //polygonTestnet
    case 80001:
      networkData = [
        {
          chainId: `0x${convertNumToHexdecimal(80001)}`,
          chainName: "Mumbai",
          rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
          nativeCurrency: {
            name: "MATIC COIN",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        },
      ];
      break;

    default:
      break;
  }

  return (
    typeof window.ethereum !== "undefined" &&
    // @ts-ignore
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: networkData,
    })
  );
};

export const CHAINS: { [chainId: number]: ExtendedChainInformation } = {
  80001: {
    urls: ["https://rpc-mumbai.maticvigil.com"],
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: "https://mumbai.polygonscan.com",
  },
};

export const CUSTOM_URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls;

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs;
    }

    return accumulator;
  },
  {}
);

export const blockchainParams = {
  chainId:`0x${convertNumToHexdecimal(80001)}`,
  chainName: "Mumbai",
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
  blockExplorerUrls: ["https://mumbai.polygonscan.com"],
};
