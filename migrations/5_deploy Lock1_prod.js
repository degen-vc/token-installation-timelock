const Lock1 = artifacts.require("Lock1")
const MockToken = artifacts.require('MockToken')
module.exports = async function (deployer, network) {
  deployer.deploy(Lock1); 
  if (network === 'development') {
    await deployer.deploy(MockToken)
  }
};