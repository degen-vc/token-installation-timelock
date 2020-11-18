const Lock = artifacts.require("Lock")

module.exports = async function (deployer, network) {
  await deployer.deploy(Lock); 
};