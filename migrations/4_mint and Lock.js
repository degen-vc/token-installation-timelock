
const Lock = artifacts.require("Lock")
const MockToken = artifacts.require('MockToken')
const Token = artifacts.require('EPANToken')





module.exports = async function (deployer, network) {
  deployer.deploy(Lock); 
  if (network === 'development') {
    await deployer.deploy(MockToken)
  } else {
    await deployer.deploy(EPANToken)

  }
};