require("@nomicfoundation/hardhat-toolbox");
require('dotenv/config');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    sepolia:{
      url:process.env.RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
      chainId:11155111
    }
  },
  solidity: "0.8.24",
};
