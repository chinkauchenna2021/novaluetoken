export const Graphhelper = [{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "encoded",
				"type": "bytes"
			}
		],
		"name": "decodeVirtualFloorMetadataV1",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "subcategory",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isListed",
						"type": "bool"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "image",
								"type": "string"
							}
						],
						"internalType": "struct VirtualFloorMetadataOpponent[]",
						"name": "opponents",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							}
						],
						"internalType": "struct VirtualFloorMetadataOutcome[]",
						"name": "outcomes",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "url",
								"type": "string"
							}
						],
						"internalType": "struct VirtualFloorMetadataResultSource[]",
						"name": "resultSources",
						"type": "tuple[]"
					},
					{
						"internalType": "string",
						"name": "discordChannelId",
						"type": "string"
					},
					{
						"internalType": "bytes",
						"name": "extraData",
						"type": "bytes"
					}
				],
				"internalType": "struct VirtualFloorMetadataV1",
				"name": "decoded",
				"type": "tuple"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "subcategory",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isListed",
						"type": "bool"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "image",
								"type": "string"
							}
						],
						"internalType": "struct VirtualFloorMetadataOpponent[]",
						"name": "opponents",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							}
						],
						"internalType": "struct VirtualFloorMetadataOutcome[]",
						"name": "outcomes",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "title",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "url",
								"type": "string"
							}
						],
						"internalType": "struct VirtualFloorMetadataResultSource[]",
						"name": "resultSources",
						"type": "tuple[]"
					},
					{
						"internalType": "string",
						"name": "discordChannelId",
						"type": "string"
					},
					{
						"internalType": "bytes",
						"name": "extraData",
						"type": "bytes"
					}
				],
				"internalType": "struct VirtualFloorMetadataV1",
				"name": "decoded",
				"type": "tuple"
			}
		],
		"name": "encodeVirtualFloorMetadataV1",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "encoded",
				"type": "bytes"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]