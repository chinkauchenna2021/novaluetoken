import { gql } from "@apollo/client";

// ToDo: Call this "VirtualFloorVitualFloorCommonFields"
const BET_LIST_COMMON_FIELDS = gql`
  fragment VitualFloorCommonFields on VirtualFloor {
    id
    intId
    subcategory {
      slug
      id
      category {
        id
      }
    }
    title
    paymentToken {
      symbol
      address
      name
      decimals
    }
    isTest
    tResultSetMin
    state
    tOpen
    betaOpen
    tClose
    tResolve
    tResultSetMax
    tResultChallengeMax
    resultUpdateAction
    totalSupply
    resultUpdateAction
    outcomes {
      index
      totalSupply
      totalWeightedSupply
      title
    }
    opponents {
      id
      title
      image
    }
    owner {
      id
    }
    bonusAmount
  }
`;

// See https://doubledice.slack.com/archives/C03903Y2FPX/p1650388068604579 for discussion on state filter, totalSupply order
export const ALL_PUBLIC_VIRTUAL_FLOORS = gql`
  ${BET_LIST_COMMON_FIELDS}
  query AllVirtualFloors (
    $skip: Int!,
    $first: Int!,
    $orderBy: String!, 
    $orderDirection: String!,
    $searchText: String!,
    $includeTest: Boolean!,
    $subcategoryIds: [String!]!,
    $vfState: [String!]!
  ) {
    virtualFloors(
      first: $first,
      skip: $skip,
      where: {
        allText_contains_nocase: $searchText,
        isListed: true,
        isTest_in: [false, $includeTest],
        state_in: $vfState,
        subcategory_in: $subcategoryIds
      },
      orderBy: $orderBy,
      orderDirection: $orderDirection
    ) {
      ...VitualFloorCommonFields
    }
  }
`;

export const PLACED_BETS_QUERY = gql`\
  ${BET_LIST_COMMON_FIELDS}
  query PlacedBets(
    $userId: ID!, 
    $skip: Int!, 
    $first: Int!
  ) {
    user(id: $userId) {
      userVirtualFloors(
        first: $first,
        skip: $skip,
        where: { totalBalancePlusTotalClaimedBalance_gt: 0 }
      ) {
        userOutcomes(where: { totalBalancePlusTotalClaimedBalance_gt: 0 }) {
          userOutcomeTimeslots(
            where: { balancePlusClaimedBalance_gt: 0 }
          ) {
            balance
            claimedBalance
            outcomeTimeslot{
              timeslot
              outcome {
                title
                index
                virtualFloor {
                  tOpen
                  ...VitualFloorCommonFields
                  winningOutcome {
                    index
                  }
                }
              }
            }
          }
        }
      }
    }
  }\
`;

export const USER_OWNED_VIRTUAL_FLOORS = gql`
  ${BET_LIST_COMMON_FIELDS}
  query OwnedVirtualFloors(
    $skip: Int!, 
    $first: Int!, 
    $userId: ID!, 
    $orderBy: String!, 
    $orderDirection: String!, 
    $includeTest: Boolean!, 
    $subcategoryIds: [String!]!, 
    $vfState: [String!]!
  ) {
    user(id: $userId) {
      ownedVirtualFloors(
        where: {
          subcategory_in: $subcategoryIds,
          isTest_in: [false, $includeTest],
          state_in: $vfState
        },
        first: $first, 
        skip: $skip, 
        orderBy: $orderBy,
        orderDirection: $orderDirection
      ) {
        ...VitualFloorCommonFields
      }
    }
  }
`;

export const VIRTUAL_FLOOR_BETS = gql`
  query VirtualFloorBets($vfIntId: String!) {
    virtualFloors(where: { intId: $vfIntId }) {
      paymentToken {
        symbol
        address
        name
      }
      intId
      tResultChallengeMax
      outcomes {
        id
        index
        title
        outcomeTimeslots {
          outcomeTimeslotTransfers(
            where: { from: "0x0000000000000000000000000000000000000000" }
          ) {
            amount
            timestamp
            to {
              id
            }
            outcomeTimeslot {
              outcome {
                index
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const VIRTUAL_FLOOR = gql`
  fragment CommonOutcomeFields on Outcome {
    index
    title
    totalSupply
    totalWeightedSupply
    userOutcomes(where: { user_not: "0x0000000000000000000000000000000000000000" }) {
      user {
        id
      }
      totalBalance
      totalWeightedBalance
      totalBalancePlusTotalClaimedBalance
      userOutcomeTimeslots {
        balance
        outcomeTimeslot {
          beta
          timeslot
          tokenId
        }
      }
    }
    outcomeTimeslots {
      timeslot
      totalSupply
    }
    virtualFloor {
      id
      intId
      state
      tClose
      tResolve
      tResultSetMin
      tResultSetMax
      tResultChallengeMax
      tOpen
      betaOpen
      totalSupply
      bonusAmount
      optionalMinCommitmentAmount
      optionalMaxCommitmentAmount
      paymentToken {
        symbol
        decimals
        address
      }
    }
  }

  query VirtualFloors($vfIntId: String!) {
    # ToDo: Once Graph starts using intId as the id,
    # revert to virtualFloor(id: $vfIntId)
    virtualFloors(where: { intId: $vfIntId }) {
      id
      intId
      subcategory {
        slug
        category {
          id
        }
      }
      title
      description
      isListed
      paymentToken {
        symbol
        decimals
        address
        name
      }
      creationFeeRate
      platformFeeRate
      tCreated
      tOpen
      tClose
      tResolve
      tResultSetMin
      resultUpdateAction
      tResultSetMax
      tResultChallengeMax
      state
      discordChannelId
      bonusAmount
      optionalMinCommitmentAmount
      optionalMaxCommitmentAmount
      winnerProfits
      outcomes {   
        ...CommonOutcomeFields
      }
      winningOutcome {
        ...CommonOutcomeFields
      }
      totalSupply
      betaOpen
      owner {
        id
      }
      opponents {
        id
        title
        image
      }
      resultSources {
        id
        title
        url
      }
      resolutionOrCancellationTxHash
    }
  }
`;

export const USER_SPECIFIC_VIRTUAL_FLOOR = gql`
  # See https://www.apollographql.com/docs/react/data/fragments/
  fragment CommonOutcomeFields on Outcome {
    index
    title
    totalSupply
    totalWeightedSupply
    userOutcomes(where: { user: $userId, totalBalance_gt: 0 }) {
      totalBalance
      totalWeightedBalance
      userOutcomeTimeslots(where: { balance_gt: 0 }) {
        balance
        outcomeTimeslot {
          beta
          timeslot
          tokenId
        }
      }
    }
  }

  query ($vfIntId: String!, $userId: ID!) {
    # ToDo: Once Graph starts using intId as the id,
    # revert to virtualFloor(id: $vfIntId)
    virtualFloors(where: { intId: $vfIntId }) {
      intId
      state
      outcomes {
        ...CommonOutcomeFields
      }
      winningOutcome {
        ...CommonOutcomeFields
      }
      winnerProfits
      bonusAmount
    }
    user(id: $userId) {
      roleUsers {
        role {
          id
        }
      }
    }
  }
`;

export const USER_QUOTA_INFO = gql`
  query GetQuota ($id: ID!) {
    user(id: $id) {
      id
      maxConcurrentVirtualFloors
      concurrentVirtualFloors
      ownedVirtualFloors {
        id
      }
    }
  }
`;

export const PAYMENT_TOKEN = gql`
  query($includeTest: Boolean = false) {
    paymentTokens(where: {
      isWhitelisted: true,
      isTest_in: [false, $includeTest],
    }) {
      id
      address
      name
      symbol
      decimals
    }
  }
`;


export const OLDEST_CLAIMABLE_VIRTUAL_FLOORS = gql`
  query ClaimableVfsCreatedAfter($createdAfterTimestamp: Int!, $maxCount: Int!, $isTest: Boolean!) {
    virtualFloors(
      where: {
        state_in: [
          Claimable_Payouts,
          Claimable_Refunds_Flagged,
          Claimable_Refunds_ResolvableNever,
          Claimable_Refunds_ResolvedNoWinners
        ],
        tCreated_gt: $createdAfterTimestamp,
        discordChannelId_not: "none",
        isTest: $isTest
      },
      orderBy: tCreated,
      orderDirection: asc,
      first: $maxCount
    ) {
      id
      intId
      discordChannelId
      isTest
      title
      state
      paymentToken {
        symbol
        address
        name
      }
      subcategory {
        id
      }
    }
  }
`;



export const ERC1155_TOKEN_METADATA_QUERY = gql`
  query($erc1155TokenId: String!) {
    # ToDo: Once Graph starts using numeric tokenId as the OutcomeTimeslot id,
    # revert to outcomeTimeslot(id: $erc1155TokenId)
    outcomeTimeslots(where: { tokenId: $erc1155TokenId }) {
      id
      timeslot
      beta
      outcome{
        totalSupply
        totalWeightedSupply
        id
        index
        title
        outcomeTimeslots{
          id
          timeslot
        }
        virtualFloor{
          id
          intId
          description
          title
          totalSupply
          totalFeeRate
          bonusAmount
          tOpen
          tClose
          tResolve
          state
          isTest
          paymentToken{
            decimals
            symbol
            name
          }
          opponents {
            id
            image
            title
          }
          category {
            id
          }
          subcategory {
            id
            subid
          }
          outcomes {
            totalSupply
            index
          }
          winningOutcome {
            index
            title
          }
          winnerProfits
        }
      }
    }
  }
`;

export const NEW_VIRTUAL_FLOORS = gql`\
  query NewVirtualFloors(
    $includeTest: Boolean!
  ) {
    virtualFloors(
      orderBy: creationTxTimestamp,
      orderDirection:desc,
      first: 20,
      where: {
        isTest_in: [false, $includeTest],
      }
    ) {
      totalSupply
      intId
      title
      description
      category {
        id
      }
      tClose
      betaOpen
      bonusAmount
      creationTxTimestamp
      paymentToken {
        symbol
        address
        name
      }
    }
  }\
`;
