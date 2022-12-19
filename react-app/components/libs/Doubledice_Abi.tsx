export const Doubledice_Abi =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "cancelVirtualFloorFlagged",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "CommitmentAmountOutOfRange",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "enum VirtualFloorState",
				"name": "state",
				"type": "uint8"
			}
		],
		"name": "CommitmentBalanceTransferRejection",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CommitmentBalanceTransferWhilePaused",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CommitmentDeadlineExpired",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CommitmentMisMatch",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CreationFeeRateTooLarge",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DuplicateVirtualFloorId",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidMinMaxCommitmentAmounts",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidTimeline",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidVirtualFloorId",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "MismatchedVirtualFloorId",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotEnoughOutcomes",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OutcomeIndexOutOfRange",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PaymentTokenNotWhitelisted",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "PlatformFeeRateTooLarge",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ResolveWhilePaused",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TooLate",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TooManyOutcomes",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TooManyWinningOutcomes",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "UFixed256x18",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "UFixed16x4LossOfPrecision",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "UFixed256x18",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "UFixed32x6LossOfPrecision",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "UnauthorizedMsgSender",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "UnsupportedLegacyVf",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "enum VirtualFloorState",
				"name": "actualState",
				"type": "uint8"
			}
		],
		"name": "WrongVirtualFloorState",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			}
		],
		"name": "cancelVirtualFloorUnresolvable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "claimPayouts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "claimRefunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "committer",
				"type": "address"
			},
			{
				"internalType": "uint8[]",
				"name": "outcomeIndexes",
				"type": "uint8[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "optionalDeadline",
				"type": "uint256"
			}
		],
		"name": "commitToVirtualFloor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "contractURI",
				"type": "string"
			}
		],
		"name": "ContractURIUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "vfId",
						"type": "uint256"
					},
					{
						"internalType": "UFixed256x18",
						"name": "betaOpen_e18",
						"type": "uint256"
					},
					{
						"internalType": "UFixed256x18",
						"name": "totalFeeRate_e18",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "tOpen",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "tClose",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "tResolve",
						"type": "uint32"
					},
					{
						"internalType": "uint8",
						"name": "nOutcomes",
						"type": "uint8"
					},
					{
						"internalType": "contract IERC20Upgradeable",
						"name": "paymentToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bonusAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "optionalMinCommitmentAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "optionalMaxCommitmentAmount",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "bytes32",
								"name": "version",
								"type": "bytes32"
							},
							{
								"internalType": "bytes",
								"name": "data",
								"type": "bytes"
							}
						],
						"internalType": "struct EncodedVirtualFloorMetadata",
						"name": "metadata",
						"type": "tuple"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					}
				],
				"internalType": "struct VirtualFloorCreationParams",
				"name": "params",
				"type": "tuple"
			}
		],
		"name": "createVirtualFloor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "tokenMetadataUriTemplate",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "protocolFeeBeneficiary",
						"type": "address"
					},
					{
						"internalType": "UFixed256x18",
						"name": "protocolFeeRate_e18",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contractURI",
						"type": "string"
					}
				],
				"internalType": "struct DoubleDiceProtocol.DoubleDiceProtocolInitParams",
				"name": "params",
				"type": "tuple"
			}
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "version",
				"type": "uint8"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "legacyClaimPayouts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "contract IERC20Upgradeable",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "whitelisted",
				"type": "bool"
			}
		],
		"name": "PaymentTokenWhitelistUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "protocolFeeBeneficiary",
				"type": "address"
			}
		],
		"name": "PlatformFeeBeneficiaryUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "UFixed256x18",
				"name": "protocolFeeRate_e18",
				"type": "uint256"
			}
		],
		"name": "PlatformFeeRateUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "winningOutcomeIndexFlags",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creatorFeeBeneficiary",
				"type": "address"
			}
		],
		"name": "resolve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeBatchTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "contractURI_",
				"type": "string"
			}
		],
		"name": "setContractURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "protocolFeeBeneficiary_",
				"type": "address"
			}
		],
		"name": "setPlatformFeeBeneficiary",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "UFixed256x18",
				"name": "protocolFeeRate_e18_",
				"type": "uint256"
			}
		],
		"name": "setPlatformFeeRate_e18",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "template",
				"type": "string"
			}
		],
		"name": "setTokenMetadataUriTemplate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "TransferBatch",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "URI",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20Upgradeable",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isWhitelisted",
				"type": "bool"
			}
		],
		"name": "updatePaymentTokenWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "committer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8[]",
				"name": "outcomeIndexes",
				"type": "uint8[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "UFixed256x18[]",
				"name": "beta_e18",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "UserCommitment",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "VirtualFloorCancellationFlagged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			}
		],
		"name": "VirtualFloorCancellationUnresolvable",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "UFixed256x18",
				"name": "betaOpen_e18",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "UFixed256x18",
				"name": "totalFeeRate_e18",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "UFixed256x18",
				"name": "protocolFeeRate_e18",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "tOpen",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "tClose",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "tResolve",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "nOutcomes",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "contract IERC20Upgradeable",
				"name": "paymentToken",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bonusAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minCommitmentAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maxCommitmentAmount",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "version",
						"type": "bytes32"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"indexed": false,
				"internalType": "struct EncodedVirtualFloorMetadata",
				"name": "metadata",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "contract IDoubleDiceApplication",
				"name": "application",
				"type": "address"
			}
		],
		"name": "VirtualFloorCreation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "winningOutcomeIndex",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum DoubleDiceProtocol.VirtualFloorResolutionType",
				"name": "resolutionType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "winnerProfits",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "protocolFeeAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creatorFeeAmount",
				"type": "uint256"
			}
		],
		"name": "VirtualFloorResolution",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "winningOutcomeIndexFlags",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum DoubleDiceProtocol.VirtualFloorResolutionType",
				"name": "resolutionType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "winnerProfits",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "protocolFeeAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "creatorFeeAmount",
				"type": "uint256"
			}
		],
		"name": "VirtualFloorResolutions",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "APPLICATION_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			}
		],
		"name": "getVirtualFloorApplication",
		"outputs": [
			{
				"internalType": "contract IDoubleDiceApplication",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			}
		],
		"name": "getVirtualFloorCreator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "outcomeIndex",
				"type": "uint8"
			}
		],
		"name": "getVirtualFloorOutcomeTotals",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "UFixed256x18",
						"name": "amountTimesBeta_e18",
						"type": "uint256"
					}
				],
				"internalType": "struct OutcomeTotals",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			}
		],
		"name": "getVirtualFloorParams",
		"outputs": [
			{
				"components": [
					{
						"internalType": "UFixed256x18",
						"name": "betaOpen_e18",
						"type": "uint256"
					},
					{
						"internalType": "UFixed256x18",
						"name": "totalFeeRate_e18",
						"type": "uint256"
					},
					{
						"internalType": "UFixed256x18",
						"name": "protocolFeeRate_e18",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "tOpen",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "tClose",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "tResolve",
						"type": "uint32"
					},
					{
						"internalType": "uint8",
						"name": "nOutcomes",
						"type": "uint8"
					},
					{
						"internalType": "contract IERC20Upgradeable",
						"name": "paymentToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bonusAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "minCommitmentAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxCommitmentAmount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "contract IDoubleDiceApplication",
						"name": "application",
						"type": "address"
					}
				],
				"internalType": "struct DoubleDiceProtocol.CreatedVirtualFloorParams",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			}
		],
		"name": "getVirtualFloorState",
		"outputs": [
			{
				"internalType": "enum VirtualFloorState",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20Upgradeable",
				"name": "token",
				"type": "address"
			}
		],
		"name": "isPaymentTokenWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "legacyCreationQuotas",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "legacyResolutions",
		"outputs": [
			{
				"internalType": "enum ResolutionState",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "setOutcomeIndex",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "tResultChallengeMax",
				"type": "uint32"
			},
			{
				"internalType": "uint8",
				"name": "challengeOutcomeIndex",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "challenger",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "OPERATOR_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeeBeneficiary",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeeRate_e18",
		"outputs": [
			{
				"internalType": "UFixed256x18",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "uri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]