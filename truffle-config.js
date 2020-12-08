/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "82346d04de8a43e0a729c0cf8022de2b";
const fs = require('fs');

const local_deployer = "0x4532280A66a0c1c709f7e0c40B14b4dEA83253C1";
const local_mnemonic = fs.readFileSync(".secret").toString().trim();

const truffleteam_deployer = "0x1D4d5eDfB61c6Cf2aD70D16816398Cd844Fc5495";
const truffleteam_mnemonic = fs.readFileSync(".truffleteam").toString().trim();


var mnemonic = fs.readFileSync(".mnemonic").toString().trim();
const deployer = "0x4532280A66a0c1c709f7e0c40B14b4dEA83253C1";


mnemonic = local_mnemonic;
if(fs.existsSync(".secret")){
  // mnemonic = fs.readFileSync(".secret").toString().trim();
}

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      provider: () => new HDWalletProvider(local_mnemonic, `http://0.0.0.0:7545`),
      host: "0.0.0.0",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 6700000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 200000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    },
    sandbox: {
      provider: () => new HDWalletProvider(truffleteam_mnemonic, `https://sandbox.truffleteams.com/6d1ffe74-8d0e-4a6f-8725-d8c18a80f309`),
      host: "https://sandbox.truffleteams.com/6d1ffe74-8d0e-4a6f-8725-d8c18a80f309",     // Localhost (default: none)
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
      network_id: 4,       // Custom network
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 100000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/`+infuraKey),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    // Goerli
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/`+infuraKey),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    // Kovan
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/`+infuraKey),
      network_id: 42,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    // xDai
    xdai: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc.xdaichain.com/`),
      network_id: 100,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    // Useful for private networks
    mainnet: { //https://web3.1inch.exchange"),// `
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/`+infuraKey),
      network_id: 1,   // This network is yours, in the cloud.
      gas: 6700000,           // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 15000000000,  // 20 gwei (in wei) (default: 100 gwei)
      // gasPrice: 25000000000,  // 20 gwei (in wei) (default: 100 gwei)
      gasPrice: 42000000000,  // 20 gwei (in wei) (default: 100 gwei)
      // gasPrice: 52000000000,  // 20 gwei (in wei) (default: 100 gwei)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      from: deployer,        // Account to send txs from (default: accounts[0])
      confirmations: 12,    // # of confs to wait between deployments. (default: 0)
      production: true,    // Treats this network as if it was a public net. (default: false)
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    },
    //Binance
    bnbtestnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545/`),
      network_id: 97,       // Custom network
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    },
    bnbmainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed.binance.org/`),
      network_id: 56,       // Custom network
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: local_deployer,        // Account to send txs from (default: accounts[0])
      production: true,    // Treats this network as if it was a public net. (default: false)
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: 'JG73NH7DPHI7DEWSE8IWUC1MQ4X38ZM8AE'
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: "JG73NH7DPHI7DEWSE8IWUC1MQ4X38ZM8AE"
  },
  sourceFetchers: ["sourcify", "etherscan"], //prefer Sourcify over Etherscan
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.7.4",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
