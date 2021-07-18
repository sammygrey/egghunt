const EggContract = artifacts.require("EggContract");

module.exports = function (deployer) {
  deployer.deploy(EggContract);
};
