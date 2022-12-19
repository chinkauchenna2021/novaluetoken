// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.12;

import "./BaseDoubleDice.sol";
import "./library/Utils.sol";

/**
 * @notice In v1 the metadata is a direct ABI-encoding of this structure.
 * @dev Potential alternative encodings:
 * - Direct JSON-encoding
 * - SHA-256 of JSON-encoding
 * - SHA-256 of JSON-encoding + validation signature
 */
struct VirtualFloorMetadataV1 {
    string category;
    string subcategory;
    string title;
    string description;
    bool isListed;
    VirtualFloorMetadataOpponent[] opponents;
    VirtualFloorMetadataOutcome[] outcomes;
    VirtualFloorMetadataResultSource[] resultSources;
    string discordChannelId;
    bytes extraData;
}

struct VirtualFloorMetadataOpponent {
    string title;
    string image;
}

struct VirtualFloorMetadataOutcome {
    string title;
}

struct VirtualFloorMetadataResultSource {
    string title;
    string url;
}


error InvalidMetadataVersion();

error MetadataOpponentArrayLengthMismatch();

error ResultSourcesArrayLengthMismatch();

error InvalidOutcomesArrayLength();

error TooFewOpponents();

error TooFewResultSources();

error EmptyCategory();

error EmptySubcategory();

error EmptyTitle();

error EmptyDescription();

error EmptyDiscordChannelId();


/**
 * @title VirtualFloorMetadataValidator extension of BaseDoubleDice contract
 * @author 🎲🎲 <dev@doubledice.com>
 * @notice This contract extends the BaseDoubleDice contract to restrict VF-creation to VFs with valid metadata only.
 */
contract VirtualFloorMetadataValidator is BaseDoubleDice {

    using Utils for string;

    function __VirtualFloorMetadataValidator_init(BaseDoubleDiceInitParams calldata params) internal onlyInitializing {
        __BaseDoubleDice_init(params);
    }

    function _onVirtualFloorCreation(VirtualFloorCreationParams calldata params) internal virtual override {
        uint256 version = uint256(params.metadata.version);
        if (!(version == 1)) revert InvalidMetadataVersion();

        (VirtualFloorMetadataV1 memory metadata) = abi.decode(params.metadata.data, (VirtualFloorMetadataV1));

        // `nOutcomes` could simply be taken to be `metadata.outcomes.length` and this `require` could then be dropped.
        // But it is accepted as separate parameter to distinguish parameters that required on-chain from those that are not,
        // and then consistency between the two in enforced with this check.
        if (!(metadata.outcomes.length == params.nOutcomes)) revert InvalidOutcomesArrayLength();

        if (!(metadata.opponents.length >= 1)) revert TooFewOpponents();

        if (!(metadata.resultSources.length >= 1)) revert TooFewResultSources();

        if (!(!metadata.category.isEmpty())) revert EmptyCategory();

        if (!(!metadata.subcategory.isEmpty())) revert EmptySubcategory();

        if (!(!metadata.title.isEmpty())) revert EmptyTitle();

        if (!(!metadata.description.isEmpty())) revert EmptyDescription();

        if (!(!metadata.discordChannelId.isEmpty())) revert EmptyDiscordChannelId();
    }

    /**
     * @dev See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;
}
