export const isWalletConnected = async(setCurrentAccount) => {

    try{
        const { ethereum } = window;
        const accounts = await ethereum.request({method: 'eth_accounts'});
        console.log(`Accounts: ${accounts}`);
    
        if(accounts.length > 0) {
            const account = accounts[0];
            console.log(`Wallet is connected! ${account}`);
            setCurrentAccount(account)
        }else{
            setCurrentAccount('');
            console.log("Make sure that metamask is connected");
        }

    }catch(error){
        console.log(error);
    }
}

export const connectWallet = async(setCurrentAccount) => {

    const { ethereum } = window;
    
    if(!ethereum){
        console.log('Please install metamask');
        return;
    }

    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    });

    setCurrentAccount(accounts[0]);

}