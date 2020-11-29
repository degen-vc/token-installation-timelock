
const Lock = artifacts.require("Lock")
const MockToken = artifacts.require('MockToken')
const EPANToken = artifacts.require('EPANToken')





module.exports = async function (deployer, network) {
  deployer.deploy(Lock); 
  if (network === 'development') {
    await deployer.deploy(MockToken)
  } else {t
    // await deployer.deploy(EPANToken)

  }
};