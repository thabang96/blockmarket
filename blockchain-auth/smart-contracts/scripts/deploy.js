const hre = require("hardhat");

async function main() {
  const ProductAuth = await hre.ethers.getContractFactory("ProductAuth");
  const productAuth = await ProductAuth.deploy();

  // Wait until the contract is mined
  await productAuth.waitForDeployment();

  const address = await productAuth.getAddress();
  console.log(`✅ Contract deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
