// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;


contract Certificate{

    address public issuer;
    mapping(bytes32 => bool) public certificates;
    
    event CertificateIssued(bytes32 indexed CertificateHash);
    event CertificateVerified(bytes32 indexed CertificateHash);

    constructor(address _issuer) {
        issuer = _issuer;
    }

    function issueCertificate(bytes32 _certificateHash) public returns(bool) {
        require(msg.sender == issuer, "Only issuer can issue the certificate");
        certificates[_certificateHash] = true;
        emit CertificateIssued(_certificateHash);
        return true;
    }

    function verifyCertificate(bytes32 _certificateHash) public view returns(bool){
        bool verified = certificates[_certificateHash];    
        if(verified) return true;
        return false;
    }


}