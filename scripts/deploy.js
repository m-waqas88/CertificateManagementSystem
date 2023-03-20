const{ethers} =require("hardhat");


async function main() {
  let contract, accounts, wallet, issuer;
  
  accounts = await ethers.getSigners();
  issuer = accounts[0];
  const Contract = await ethers.getContractFactory("Certificate");
  contract = await Contract.deploy(issuer.address);
  await contract.deployed();

  console.log("Contract deployed at: ", contract.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

