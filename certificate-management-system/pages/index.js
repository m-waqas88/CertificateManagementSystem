import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Banner from '../components/Banner';
import FormSection from '../components/FormSection';
import { useEffect, useState } from 'react';
import { isWalletConnected } from '../utils/helper-functions';

export default function Home() {
  
  const [currentAccount, setCurrentAccount] = useState('');

  useEffect(() => {
    const { ethereum } = window;
    ethereum.on('accountsChanged', () => {
      isWalletConnected(setCurrentAccount);
    })
  }, [currentAccount]);

  return (
    <>
      <Head>
        <title>Decentralized Certificate Management System</title>
        <meta name="description" content="Decentralized Certificate Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner account={{currentAccount,setCurrentAccount}} text="DECENTRALIZED CERTIFICATE VERIFICATION SYSTEM" />
      <FormSection type="issue" account={currentAccount}/>
      <FormSection type="verify" />
    </>
  )
}
