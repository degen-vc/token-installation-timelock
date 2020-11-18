// contracts/EPANToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

import "contracts/lib/ERC20.sol";

contract EPANToken is ERC20 {

    // uint256 public constant initialSupply = 94697000;
    constructor(uint256 initialSupply) {
        // const initialSupply = 94697000;
        _mint(msg.sender, initialSupply);
    }
}