const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe("Token Contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("Token");
    const [owner, addr1, addr2] =  await ethers.getSigners();

    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  describe('Deployment', function () {

    // it("The address is valid", async function () {
    //   assert.notEqual(owner, null);
    //   assert.notEqual(owner, undefined);
    //   assert.notEqual(owner, 0x0);
    //   assert.notEqual(owner, "");
    // });

    it("Should set the right owner", async function (){
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture); 
      expect(await hardhatToken.owner()).to.equal(owner.address); // The same that deploy the contract should be the same that is been tested
    });

    it("Should assign the total supply of tokens to the owner", async function (){
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture); 
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(ownerBalance);
    });
  });


  // Testing if the transactions and event works 
  describe('Transactions', function() {

    it("Should transfer between accounts", async function() {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      
      await hardhatToken.transfer(addr1.address, 50);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
      // .to.changeTokenBalances in some sense we enter the function to change the value, if we check the contract we could see that.
      // balances[owner] = [owner...]
      // balances[to] = [...., addr1]
      await hardhatToken.connect(addr1).transfer(addr2.address, 25);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(25);

    });
    // That test 
    it("should emit Transfer events", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

      await expect(hardhatToken.transfer(addr1.address, 50)).to.emit(hardhatToken, "Transfer").withArgs(owner.address, addr1.address, 50)

      await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50)).to.emit(hardhatToken, "Transfer").withArgs(addr1.address, addr2.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(deployTokenFixture);

      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough funds to transfer");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});





// HARDHAT NOT COMPLEX



// describe("Token contract", function () {

//   //Simple, we wanna know if the msg.sender is an address valid 
//   it("The address is valid", async function() {
//     const [owner] = await ethers.getSigners();
//     assert.notEqual(owner, null);
//     assert.notEqual(owner, undefined);
//     assert.notEqual(owner, 0x0);
//     assert.notEqual(owner, "");
//   })

//   it("Deployment should assign the total supply of tokens to the owner", async function () {

//     //it's declared owner, getSigners return the first address like ganache does, in his network, hardhat Network
//     const [owner] = await ethers.getSigners(); 

//     // deploy and recognize the contract as Token, and ContractFactory function is used to that
//     const Token = await ethers.getContractFactory("Token");

//     // after you deploy a smart contract with ContractFactory function, deploy() will start the deployment
//     const hardhatToken = await Token.deploy();

//     // after we deploy the contract, we can access to the functions of the contract with hardhatToken, we called balanceOf function 
//     const ownerBalance = await hardhatToken.balanceOf(owner.address);

//     // the totalSupply should be equal to the total ownerBalance amount of tokens
//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // we expect that the totalSupply is equal to the total owner balance cos the mapping show that, but the constructor defined that.
//   });

//   it("should transfer tokens between accounts", async function () {
//     const [owner, addr1, addr2] = await ethers.getSigners(); // the owner is the first account and soon.

//     // deploy and recognize the contract as Token, and ContractFactory function is used to that
//     const Token = await ethers.getContractFactory("Token");

//     // after you deploy a smart contract with ContractFactory function, deploy() will start the deployment
//     const hardhatToken = await Token.deploy();

//     // we use the transfer function
//     await hardhatToken.transfer(addr1.address, 50);
//     // and we expect that the transfer worked
//     expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

//     await hardhatToken.connect(addr1).transfer(addr2.address, 25);
//     expect(await hardhatToken.balanceOf(addr2.address)).to.equal(25);

//   })

//   // it("what this testing gonna proof and what tasks that the contract will do")
// });