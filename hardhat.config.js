require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "GT-hApI-rRT_RiINGsK_O0Ad-NVfYlEp";
const GOERLI_PRIVATE_KEY = "b110b5880e0ca0fba62b2515746731f6b4fbe740922eae223d8d2030537889fd";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
