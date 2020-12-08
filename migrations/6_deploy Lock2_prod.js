const Lock2 = artifacts.require("Lock2")
const MockToken = artifacts.require('MockToken')
module.exports = async function (deployer, network) {
  deployer.deploy(Lock2); 
  if (network === 'development') {
    await deployer.deploy(MockToken)
  }
};