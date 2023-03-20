const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("Certificate Issuance and Verification", () => {

  const CERTIFICATE_HASH = '0xe1f5fdfc4ea680634168535290f8a5ec6b9bcdddfd975ce1bb3fbbf7e82da5c5'
  let contract, accounts, wallet, issuer;
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  
  before(async() => {
    accounts = await ethers.getSigners();
    issuer = accounts[0];
    const Contract = await ethers.getContractFactory("Certificate");
    contract = await Contract.deploy(issuer.address);
    await contract.deployed();

    console.log("Contract deployed at: ", contract.address);

  });

  it("Certificate is issued, event is emitted and only issuer can issue certificate", async() => {

    // wallet = await contract.connect(accounts[2]);
    wallet = await contract.connect(issuer);  
    const transaction = await wallet.issueCertificate(CERTIFICATE_HASH);
    const tx = await transaction.wait();
    const eventEmmited = tx.events.length;
    const certificates = await wallet.certificates(CERTIFICATE_HASH);
    
    expect(certificates).to.equal(true);
    expect(eventEmmited).is.greaterThan(0);
  });

  it("Certificate is verified", async() => {
    wallet = await contract.connect(issuer);
    const success = await wallet.verifyCertificate(CERTIFICATE_HASH);
    expect(success).to.equal(true);
  });




});