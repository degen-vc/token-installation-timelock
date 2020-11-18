const Migrations = artifacts.require("Migrations");
const Token = artifacts.require('EPANToken')

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};


