// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Egg is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("Egg", "EGG") {}

    function awardEgg(address finder, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newEggId = _tokenIds.current();
        _mint(finder, newEggId);
        _setTokenURI(newEggId, tokenURI);

        return newEggId;
    }
}