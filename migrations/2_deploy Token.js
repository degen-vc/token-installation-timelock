
const MockToken = artifacts.require('MockToken')
const Token = artifacts.require('EPANToken')





module.exports = async function (deployer, network) {
  if (network === 'development') {
    await deployer.deploy(MockToken)
  } else {
    await deployer.deploy(EPANToken(94697000))

  }
};