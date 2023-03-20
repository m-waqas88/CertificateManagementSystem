require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts: [process.env.MAIN_ACCOUNT],
    //   chainId: 80001,
    // }
  },
  gasReporter: {
    token: 'matic',
    enabled: true,
    currency: 'USD',
    coinmarketcap: "4403d20c-9317-44bd-ae14-eba31d8a9afc"
  }
};
