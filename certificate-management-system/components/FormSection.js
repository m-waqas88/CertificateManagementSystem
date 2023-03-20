import React, { useState } from 'react';
import InputForm from './InputForm';
import Button from './Button';
const { ethers } = require('ethers');
import abi from '../utils/Certificate.json';
import { Puff } from 'react-loading-icons';

const FormSection = (props) => {

  const [issuedisabled, setIssueDisabled] = useState(true);
  const [formData, setFormData] = useState({uid: ''});
  const [issueStatus, setIssueStatus] = useState('');
  const [verifyStatus, setVerifyStatus] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [ownerError, setOwnerError] = useState(false);

  const contractAddress = "0xA22Bb2c3D35934596ce1953B3EDccf14547Ad1C0"; // deployed on polygon
  const contractAbi = abi.abi;

  const formSubmit = async (e) => {
    e.preventDefault();
    setIssueStatus('');

    const formRequest = props.type;

    const valueToBeParsed = ethers.utils.formatBytes32String(formData.uid);
    const{ ethereum } = window;

    if(!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
    const signer = provider.getSigner();

    
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    
    try{

      if(formRequest === 'verify'){
        setLoadingState(true);
        const verification = await contract.verifyCertificate(valueToBeParsed);
        if(!verification){
          setVerifyStatus('unverified');
        }else if(verification){
          setVerifyStatus('verified');
        }
      }else{
        setLoadingState(true);
        const transaction = await contract.issueCertificate(valueToBeParsed);
        const tx = await transaction.wait();
        if(!tx.status === 1) return;
        setOwnerError(false)
        setIssueStatus('issued');
      }
      
      
    }catch(error){
      console.log(error);
      const errString = error?.reason;
      console.log(errString);
      const strCheck = "Only issuer can issue the certificate";
      const onlyOwnerCheckFailed = errString ? errString.includes(strCheck) : false;
      setIssueStatus('');
      setVerifyStatus('');
      setOwnerError(onlyOwnerCheckFailed);
      
    }
    setLoadingState(false);
    
  }
  
  return (
    <form onSubmit={formSubmit}>
      <div className="relative flex flex-col justify-center mt-10 p-20 rounded w-1/2 mr-auto ml-auto shadow-2xl ">
        <div className="after:z-[-1] after:content-[''] after:bg-white after:h-full after:w-full after:top-0 after:left-0 after:absolute after:opacity-20">
          <InputForm {...props} disability={{ issuedisabled, setIssueDisabled }} setFormData={setFormData}/>
          {
            loadingState && props.type === 'issue' && (<div className="flex justify-center">
              <Puff />
            </div>)
          }
            
          <Button 
          text={props.type === 'issue' ? 'Issue Certificate' : "Verify Certificate"} 
          disability={{ issuedisabled, setIssueDisabled }} 
          {...props} 
          />
          {
            (issueStatus && props.type === 'issue') && (<p className="text-center mt-1">Ceritificate issued successfully!</p>)
          }
          {
            (ownerError && props.type === 'issue') && (<p className="text-center mt-1 text-red-600">Only owner can issue the certificate</p>)
          }
          {
            (verifyStatus === 'verified' && props.type === 'verify') && (<p className="text-center mt-1">Certificate verified successfully!</p>)
          }
          {
            (verifyStatus === 'unverified' && props.type === 'verify') && (<p className="text-center mt-1 text-red-600">Unable to verify the given certificate UID</p>)
          }
        </div>
      </div>
    </form>

  )
}

export default FormSection