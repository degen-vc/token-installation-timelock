
const Lock = artifacts.require("Lock")
const MockToken = artifacts.require('MockToken')





module.exports = async function (deployer, network) {
  deployer.deploy(Lock); 
  if (network === 'development') {
    await deployer.deploy(MockToken)
  } else {t


  }
};