// contracts/EPANToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "contracts/lib/*";

contract EPANToken is ERC20 {

    uint initialSupply = 94697000;

    constructor(uint256 initialSupply) is public ERC20 {
        // const initialSupply = 94697000;
        _mint(msg.sender, initialSupply);
    }
}