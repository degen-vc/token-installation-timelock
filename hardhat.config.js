const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "9698ade175d94981abe3e552c59f6e8e";
const fs = require('fs');
const local_deployer = "0x4532280A66a0c1c709f7e0c40B14b4dEA83253C1";
const local_mnemonic = fs.readFileSync(".mnemonic").toString().trim();

const deployer = "0xC49F90E9d521542C3FbCD9718CC44Bd5dBEed062";
const mnemonic = fs.readFileSync(".secret").toString().trim();

require("@nomiclabs/hardhat-etherscan");
import "hardhat-deploy-ethers";

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      provider: () => new HDWalletProvider(local_mnemonic, `http://0.0.0.0:7545`),
      url: "http://0.0.0.0:7545",
      host: "0.0.0.0",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 6700000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 200000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/`+infuraKey),
      url: `https://rinkeby.infura.io/v3/`+infuraKey,
      network_id: 4,       // Custom network
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/`+infuraKey),
      url: `https://ropsten.infura.io/v3/`+infuraKey,
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    // Useful for private networks
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/`+infuraKey),
      url: `https://mainnet.infura.io/v3/`+infuraKey,
      network_id: 1,   // This network is yours, in the cloud.
      gas: 6700000,           // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      confirmations: 12,    // # of confs to wait between deployments. (default: 0)
      production: true    // Treats this network as if it was a public net. (default: false)
    },
    //Binance
    bnbtestnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545/`),
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      network_id: 97,       // Custom network
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    },
    bnbmainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed.binance.org/`),
      url: `https://bsc-dataseed.binance.org/`,
      network_id: 56,       // Custom network
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    }
  },
  solidity: {
    version: "0.7.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: "JG73NH7DPHI7DEWSE8IWUC1MQ4X38ZM8AE"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
}