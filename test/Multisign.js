const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { ethers } = require('hardhat');

describe('MultiSignWallet Contract', function () {
    async function deployMultiSignWalletFixture() {
        const MultiSignWallet = await ethers.getContractFactory("Multisign");
        const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

        const hardhatMultiSignWallet = await MultiSignWallet.deploy();
        await hardhatMultiSignWallet.deployed();
        return { MultiSignWallet, owner, addr1, addr2, addr3, addr4, addr5, hardhatMultiSignWallet};
    }

    describe('Deployment', function () {
        
        it("Should all requires get done", async function () {
            const { hardhatMultiSignWallet } = await loadFixture(deployMultiSignWalletFixture);
            expect(await hardhatMultiSignWallet._owners.length).to.not.equal(0);
        });
    });
});