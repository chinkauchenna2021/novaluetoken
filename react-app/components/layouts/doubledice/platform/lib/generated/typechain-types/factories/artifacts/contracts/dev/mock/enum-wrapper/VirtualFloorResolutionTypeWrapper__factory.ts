/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  VirtualFloorResolutionTypeWrapper,
  VirtualFloorResolutionTypeWrapperInterface,
} from "../../../../../../artifacts/contracts/dev/mock/enum-wrapper/VirtualFloorResolutionTypeWrapper";

const _abi = [
  {
    inputs: [],
    name: "NoWinners",
    outputs: [
      {
        internalType: "enum BaseDoubleDice.VirtualFloorResolutionType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Winners",
    outputs: [
      {
        internalType: "enum BaseDoubleDice.VirtualFloorResolutionType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060b68061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80633728feb31460375780639951a417146052575b600080fd5b603e600081565b604051604991906059565b60405180910390f35b603e600181565b6020810160028310607a57634e487b7160e01b600052602160045260246000fd5b9190529056fea2646970667358221220c1608a46380c6ea18cbe460fc8949d6aee0529b171b36346ceeb647e4078dfee64736f6c634300080c0033";

type VirtualFloorResolutionTypeWrapperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VirtualFloorResolutionTypeWrapperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VirtualFloorResolutionTypeWrapper__factory extends ContractFactory {
  constructor(...args: VirtualFloorResolutionTypeWrapperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VirtualFloorResolutionTypeWrapper> {
    return super.deploy(
      overrides || {}
    ) as Promise<VirtualFloorResolutionTypeWrapper>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): VirtualFloorResolutionTypeWrapper {
    return super.attach(address) as VirtualFloorResolutionTypeWrapper;
  }
  override connect(signer: Signer): VirtualFloorResolutionTypeWrapper__factory {
    return super.connect(signer) as VirtualFloorResolutionTypeWrapper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VirtualFloorResolutionTypeWrapperInterface {
    return new utils.Interface(
      _abi
    ) as VirtualFloorResolutionTypeWrapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VirtualFloorResolutionTypeWrapper {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as VirtualFloorResolutionTypeWrapper;
  }
}
