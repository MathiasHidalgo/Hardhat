//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

contract Token {

    // Basic elements
    string public name = "Epsylon Token";
    string public abbreviation = "ESF";

    //the total Supply of tokens
    uint256 public totalSupply = 10000; // :)))

    // msg.sender, who deployed the contract
    address public owner;

    //A mapping that need a key(an address) to a value(the balance of that address) called balances
    mapping(address => uint256) balances;

    event Transfer(address indexed owner, address indexed to, uint256 amount);

    /*
    ** CONTRACT INIT
    */
    constructor() {

        // the supply will be show in the balance of the address
        balances[msg.sender] = totalSupply; // the mmaping will return the uint256(balances) is gonna be the totalSupply variable 
        owner = msg.sender; // indeed the owner is who deployed the contract
    }

    // A transfer of the owner to an account and the amount
    function transfer(address to, uint256 amount) external { 

        //like a conditional, we require that the balances of the deployer should be more or equal than the amount of the tokens he wanna transfer
        require(balances[msg.sender] >= amount, "Not enough funds to transfer");

            // The transfer, here we see that the balances of the owner reduce because he wants to transfer the token
        balances[owner] -= amount;
        balances[to] += amount; 

        // event emitted and added to the blokchain
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns(uint256) {
        return balances[account];
    }
    
}