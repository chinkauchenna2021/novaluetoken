export const Clasical_Abi = [
	{
		"inputs": [],
		"name": "BetaOpenTooSmall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ChallengeOutcomeIndexEqualToSet",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "CreationQuotaExceeded",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EmptyCategory",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EmptyDescription",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EmptyDiscordChannelId",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EmptySubcategory",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EmptyTitle",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidMetadataVersion",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidOutcomesArrayLength",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidTimeline",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OutcomeIndexOutOfRange",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TooEarly",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TooFewOpponents",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TooFewResultSources",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TooLate",
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
				"internalType": "enum ResolutionState",
				"name": "actualState",
				"type": "uint8"
			}
		],
		"name": "WrongResolutionState",
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
				"components": [
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "int256",
						"name": "relativeAmount",
						"type": "int256"
					}
				],
				"indexed": false,
				"internalType": "struct CreationQuotas.QuotaAdjustment[]",
				"name": "adjustments",
				"type": "tuple[]"
			}
		],
		"name": "CreationQuotaAdjustments",
		"type": "event"
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
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum ChallengeableCreatorOracle.ResultUpdateAction",
				"name": "action",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "outcomeIndex",
				"type": "uint8"
			}
		],
		"name": "ResultUpdate",
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
				"internalType": "UFixed256x18",
				"name": "betaOpen_e18",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "tOpen",
				"type": "uint32"
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
			}
		],
		"name": "VirtualFloorCreation",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "int256",
						"name": "relativeAmount",
						"type": "int256"
					}
				],
				"internalType": "struct CreationQuotas.QuotaAdjustment[]",
				"name": "adjustments",
				"type": "tuple[]"
			}
		],
		"name": "adjustCreationQuotas",
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
				"internalType": "uint8",
				"name": "challengeOutcomeIndex",
				"type": "uint8"
			}
		],
		"name": "challengeSetResult",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			}
		],
		"name": "confirmUnchallengedResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "finalOutcomeIndex",
				"type": "uint8"
			}
		],
		"name": "finalizeChallenge",
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
				"internalType": "uint8",
				"name": "finalOutcomeIndex",
				"type": "uint8"
			}
		],
		"name": "finalizeUnsetResult",
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
		"inputs": [],
		"name": "initialize",
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
			}
		],
		"name": "onVirtualFloorConclusion",
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
		"name": "renounceRole",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "setOutcomeIndex",
				"type": "uint8"
			}
		],
		"name": "setResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract DoubleDiceProtocol",
				"name": "protocol",
				"type": "address"
			},
			{
				"internalType": "contract IERC20MetadataUpgradeable",
				"name": "bondUsdErc20Token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_resolutions",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vfId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "betaOf",
		"outputs": [
			{
				"internalType": "UFixed32x6",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bondAmount",
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
		"inputs": [],
		"name": "bondUsdErc20Token",
		"outputs": [
			{
				"internalType": "contract IERC20MetadataUpgradeable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CHALLENGE_BOND_USD_AMOUNT",
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
		"inputs": [],
		"name": "CHALLENGE_WINDOW_DURATION",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "creationQuotas",
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
		"name": "PROTOCOL",
		"outputs": [
			{
				"internalType": "contract DoubleDiceProtocol",
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
		"name": "resolutions",
		"outputs": [
			{
				"components": [
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
				"internalType": "struct Resolution",
				"name": "resolution",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SET_WINDOW_DURATION",
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
	}
]