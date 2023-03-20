import React, { useState } from 'react';
const ethers = require('ethers');

const  InputForm = (props) => {

  const onChange = (e) => {
    e.preventDefault();
    const inputVal = e.target.value;
    const checkStr = inputVal.slice(0,4);
    if(checkStr === 'bafy'){
      props.disability.setIssueDisabled(false);
      props.setFormData({uid: inputVal});
    }else{
      props.disability.setIssueDisabled(true);
    }
  }

  return (

    <div className="flex items-center flex-col">
        <input onChange={onChange} className="border rounded py-1 px-3 w-64" placeholder="Please enter certificate UID" />
        {
            props.type === 'issue' && (<p className="text-xs text-slate-600">Only authorized issuer can issue the certificate</p>)
        }
    </div>
  )
}

export default InputForm