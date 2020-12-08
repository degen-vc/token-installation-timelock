
const MockToken = artifacts.require('MockToken');
const Address = artifacts.require("Address");
const SafeMath = artifacts.require("SafeMath");
const Context = artifacts.require("Context");

const IERC20 = artifacts.require("IERC20");

const ERC20 = artifacts.require("ERC20");


module.exports = async function (deployer, network) {

  const _name = "TestToken";
  const _symbol = "MYTO";
  const _decimals = 18;
  const _totalSupply = 5000;



  if (network === 'development') {
    await deployer.deploy(MockToken);
  } else if (network === 'truamtruam') {
    await deployer.deploy(MockToken);
  }else {
    if (network === 'mainnet') {
        // await deployer.deploy(MockToken , _name, _symbol, _decimals, _totalSupply);
    }
  }

  await deployer.deploy(Address);
  await deployer.deploy(SafeMath);
  await deployer.deploy(Context);
  // await deployer.deploy(IERC20);
  await deployer.deploy(ERC20);


};