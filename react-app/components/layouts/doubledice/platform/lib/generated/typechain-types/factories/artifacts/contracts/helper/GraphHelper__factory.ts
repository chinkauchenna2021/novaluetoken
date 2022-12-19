/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  GraphHelper,
  GraphHelperInterface,
} from "../../../../artifacts/contracts/helper/GraphHelper";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encoded",
        type: "bytes",
      },
    ],
    name: "decodeVirtualFloorMetadataV1",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "subcategory",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isListed",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "image",
                type: "string",
              },
            ],
            internalType: "struct VirtualFloorMetadataOpponent[]",
            name: "opponents",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
            ],
            internalType: "struct VirtualFloorMetadataOutcome[]",
            name: "outcomes",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
            ],
            internalType: "struct VirtualFloorMetadataResultSource[]",
            name: "resultSources",
            type: "tuple[]",
          },
          {
            internalType: "string",
            name: "discordChannelId",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct VirtualFloorMetadataV1",
        name: "decoded",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "subcategory",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isListed",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "image",
                type: "string",
              },
            ],
            internalType: "struct VirtualFloorMetadataOpponent[]",
            name: "opponents",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
            ],
            internalType: "struct VirtualFloorMetadataOutcome[]",
            name: "outcomes",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
            ],
            internalType: "struct VirtualFloorMetadataResultSource[]",
            name: "resultSources",
            type: "tuple[]",
          },
          {
            internalType: "string",
            name: "discordChannelId",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct VirtualFloorMetadataV1",
        name: "decoded",
        type: "tuple",
      },
    ],
    name: "encodeVirtualFloorMetadataV1",
    outputs: [
      {
        internalType: "bytes",
        name: "encoded",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c93806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806392bedfc01461003b578063ea8fa58814610064575b600080fd5b61004e610049366004610118565b610084565b60405161005b91906101a0565b60405180910390f35b6100776100723660046101b3565b6100ad565b60405161005b9190610348565b6060816040516020016100979190610651565b6040516020818303038152906040529050919050565b6101056040518061014001604052806060815260200160608152602001606081526020016060815260200160001515815260200160608152602001606081526020016060815260200160608152602001606081525090565b61011182840184610ab9565b9392505050565b60006020828403121561012a57600080fd5b81356001600160401b0381111561014057600080fd5b8201610140818503121561011157600080fd5b6000815180845260005b818110156101795760208185018101518683018201520161015d565b8181111561018b576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006101116020830184610153565b600080602083850312156101c657600080fd5b82356001600160401b03808211156101dd57600080fd5b818501915085601f8301126101f157600080fd5b81358181111561020057600080fd5b86602082850101111561021257600080fd5b60209290920196919550909350505050565b60008151604084526102396040850182610153565b9050602083015184820360208601526102528282610153565b95945050505050565b600081518084526020808501808196508360051b8101915082860160005b858110156102a3578284038952610291848351610224565b98850198935090840190600101610279565b5091979650505050505050565b600081518084526020808501808196508360051b8101915082860160005b858110156102a35782840389528151518585526102ed86860182610153565b99860199945050908401906001016102ce565b600081518084526020808501808196508360051b8101915082860160005b858110156102a3578284038952610336848351610224565b9885019893509084019060010161031e565b6020815260008251610140806020850152610367610160850183610153565b91506020850151601f19808685030160408701526103858483610153565b935060408701519150808685030160608701526103a28483610153565b935060608701519150808685030160808701526103bf8483610153565b9350608087015191506103d660a087018315159052565b60a08701519150808685030160c08701526103f1848361025b565b935060c08701519150808685030160e087015261040e84836102b0565b935060e0870151915061010081878603018188015261042d8584610300565b94508088015192505061012081878603018188015261044c8584610153565b9088015187820390920184880152935090506104688382610153565b9695505050505050565b6000808335601e1984360301811261048957600080fd5b83016020810192503590506001600160401b038111156104a857600080fd5b8036038313156104b757600080fd5b9250929050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b803580151581146104f757600080fd5b919050565b6000808335601e1984360301811261051357600080fd5b83016020810192503590506001600160401b0381111561053257600080fd5b8060051b36038313156104b757600080fd5b81835260006020808501808196508560051b81019150846000805b888110156105d6578385038a528235603e1989360301811261057f578283fd5b8801604061058d8280610472565b82895261059d838a0182846104be565b925050506105ad88830183610472565b9250878203898901526105c18284836104be565b9c89019c97505050928601925060010161055f565b509298975050505050505050565b81835260006020808501808196508560051b81019150846000805b888110156105d6578385038a528235601e1989360301811261061f578283fd5b880161062b8180610472565b915087875261063d88880183836104be565b9b88019b96505050918501916001016105ff565b6020815260006106618384610472565b610140806020860152610679610160860183856104be565b92506106886020870187610472565b9250601f19808786030160408801526106a28585846104be565b94506106b16040890189610472565b94509150808786030160608801526106ca8585846104be565b94506106d96060890189610472565b94509150808786030160808801526106f28585846104be565b9450610700608089016104e7565b80151560a0890152935061071760a08901896104fc565b94509150808786030160c0880152610730858584610544565b945061073f60c08901896104fc565b94509150808786030160e08801526107588585846105e4565b945061076760e08901896104fc565b94509150610100818887030181890152610782868685610544565b9550610790818a018a610472565b95509250506101208188870301818901526107ac8686856104be565b95506107ba818a018a610472565b9550925050808786030183880152506107d48484836104be565b979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051602081016001600160401b0381118282101715610817576108176107df565b60405290565b60405161014081016001600160401b0381118282101715610817576108176107df565b604051601f8201601f191681016001600160401b0381118282101715610868576108686107df565b604052919050565b600082601f83011261088157600080fd5b81356001600160401b0381111561089a5761089a6107df565b6108ad601f8201601f1916602001610840565b8181528460208386010111156108c257600080fd5b816020850160208301376000918101602001919091529392505050565b60006001600160401b038211156108f8576108f86107df565b5060051b60200190565b600082601f83011261091357600080fd5b81356020610928610923836108df565b610840565b82815260059290921b8401810191818101908684111561094757600080fd5b8286015b848110156109f85780356001600160401b038082111561096b5760008081fd5b908801906040828b03601f19018113156109855760008081fd5b8051818101818110848211171561099e5761099e6107df565b825283880135838111156109b25760008081fd5b6109c08d8a83880101610870565b8252509083013590828211156109d65760008081fd5b6109e48c8984870101610870565b81890152865250505091830191830161094b565b509695505050505050565b600082601f830112610a1457600080fd5b81356020610a24610923836108df565b82815260059290921b84018101918181019086841115610a4357600080fd5b8286015b848110156109f85780356001600160401b0380821115610a675760008081fd5b90880190818a03601f1901861315610a7f5760008081fd5b610a876107f5565b8683013582811115610a995760008081fd5b610aa78c8983870101610870565b82525085525050918301918301610a47565b600060208284031215610acb57600080fd5b81356001600160401b0380821115610ae257600080fd5b908301906101408286031215610af757600080fd5b610aff61081d565b823582811115610b0e57600080fd5b610b1a87828601610870565b825250602083013582811115610b2f57600080fd5b610b3b87828601610870565b602083015250604083013582811115610b5357600080fd5b610b5f87828601610870565b604083015250606083013582811115610b7757600080fd5b610b8387828601610870565b606083015250610b95608084016104e7565b608082015260a083013582811115610bac57600080fd5b610bb887828601610902565b60a08301525060c083013582811115610bd057600080fd5b610bdc87828601610a03565b60c08301525060e083013582811115610bf457600080fd5b610c0087828601610902565b60e0830152506101008084013583811115610c1a57600080fd5b610c2688828701610870565b8284015250506101208084013583811115610c4057600080fd5b610c4c88828701610870565b91830191909152509594505050505056fea26469706673582212205dcb0a8805b8644761a8d627954f92d1ee34f036d1279a08a5dfe42a8769b29764736f6c634300080c0033";

type GraphHelperConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GraphHelperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GraphHelper__factory extends ContractFactory {
  constructor(...args: GraphHelperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GraphHelper> {
    return super.deploy(overrides || {}) as Promise<GraphHelper>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GraphHelper {
    return super.attach(address) as GraphHelper;
  }
  override connect(signer: Signer): GraphHelper__factory {
    return super.connect(signer) as GraphHelper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GraphHelperInterface {
    return new utils.Interface(_abi) as GraphHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GraphHelper {
    return new Contract(address, _abi, signerOrProvider) as GraphHelper;
  }
}