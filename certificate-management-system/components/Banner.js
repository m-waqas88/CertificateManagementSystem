import { React, useEffect, useRef } from 'react';
import { connectWallet, isWalletConnected } from '../utils/helper-functions';


const  Banner = (props) => {

  const formattedAddress = useRef('');
  const formatAddress = (address) => {
    const firstPart = address.slice(0,6);
    const lastPart = address.slice(-6);
    return `${firstPart}....${lastPart}`;
  }

  if(props.account.currentAccount){
    formattedAddress.current = formatAddress(props.account.currentAccount)
  }

  useEffect(() => {
    if(props.account.currentAccount){
      formattedAddress.current = formatAddress(props.account.currentAccount)
    }
    isWalletConnected(props.account.setCurrentAccount);
  });

  return (
    <div className="flex flex-col items-center">
        <h1 className="py-6 font-mono text-3xl font-bold text-center" ><span className="border-b-4 border-white-500 rounded-br-lg rounded-bl-lg">{props.text}</span></h1>
        {
          props.account.currentAccount ? 
          (<span className='shadow-xl px-6 py-1 rounded-2xl font-mono bg-gradient-to-tr from-purple-300 to-blue-700'>
            {formattedAddress.current}
            </span>) : 
          (<button onClick={() => connectWallet(props.account.setCurrentAccount)} className='shadow-xl px-6 py-1 rounded-2xl font-mono bg-gradient-to-tr from-purple-300 to-blue-700'><span>In order to issue certificate wallet must be connected. Click to connect now!</span></button>)
        }
          
    </div>
  )
}

export default Banner