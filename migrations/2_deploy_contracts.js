const EggContract = artifacts.require("EggContract");

module.export = function (deployer) {
  deployer.deploy(EggContract);
};
