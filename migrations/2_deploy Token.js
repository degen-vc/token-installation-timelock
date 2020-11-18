
const MockToken = artifacts.require('MockToken')
const EPANToken = artifacts.require('EPANToken')





module.exports = async function (deployer, network) {

  // const _name = "My Token";
  // const _symbol = "MYTO";
  // const _decimals = 1;
  // const _totalSupply = 5000;



  if (network === 'development') {
    await deployer.deploy(MockToken)
  } else {

    // await deployer.deploy(MyToken, _name, _symbol, _decimals, _totalSupply);
    await deployer.deploy(EPANToken, 94697000)
    const deployedToken = await EPANToken.deployed();

  }
};