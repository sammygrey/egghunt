// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EggContract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("Egg", "EGG") {
    }

    function awardItem(address recipient, string memory metadata)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newEggId = _tokenIds.current();
        _mint(recipient, newEggId);
        _setTokenURI(newEggId, metadata);
        return newEggId;
    }
}