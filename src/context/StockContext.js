import React from 'react';
import { ethers } from 'ethers'
import { useState,useEffect } from "react";
import { ContractAddress, StockTokenABI } from '../constants/Constant'

const fetchContract =  (signerOrProvider) =>new ethers.Contract(ContractAddress,StockTokenABI,signerOrProvider)

export const StockContext = React.createContext();

export const StockProvider =  ({children}) => {
    const[isLoading,setIsLoading] = useState(false)
    const [error, setError] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [currentAccount, setCurrentAccount] = useState('')
    const [tokenBalance, setTokenBalance] = useState('')
    const [contractInfo, setContractInfo] = useState({

        tokenName: "-",
        tokenSymbol: "-",
        totalSupply: "-"
    })
   

    // const checkIfWalletIsConnected = async () => {
    //     if (!window.ethereum) return setError("Please install MetaMask")

    //     const account = await window.ethereum.request({ method: "eth_accounts" });

    //     if (account.length) {
    //         setCurrentAccount(account[0]);
    //         setConnButtonText('')
    //     } else {
    //         setError("Please Install MetaMask & Connect, and Reload")
    //     }
    // }
    const connectWallet = async () => {
        if (!window.ethereum) {
            return setError("Please install MetaMask")
        } else {
            setError("Connecting to your wallet .....")
            const account = await window.ethereum.request({ method: "eth_requestAccounts" })
            setCurrentAccount(account[0])
            setConnButtonText('')
           
        }
        setError('')
        
    }
    const getContract = async () => {
        setIsLoading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const erc20 = fetchContract(provider)

        const tokenName = await erc20.name();
        const tokenSymbol = await erc20.symbol();
        const total = await erc20.totalSupply();
        const totalSupply = total.toString()
        

        setContractInfo({
            tokenName,
            tokenSymbol,
            totalSupply
        })
        setIsLoading(false)
    }

    const transferToken = async (address, value) => {
        try {
            setIsLoading(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const erc20 = new ethers.Contract(ContractAddress, StockTokenABI, signer);
            await erc20.transfer(address, value)
            setIsLoading(false)
            alert('Successfully Transfered amount ' +value+ ' of the StockToken to '+address)
            
        } catch (error) {
            alert('Something went wrong '+error)
        }
        setIsLoading(false)
    }
    const burnToken = async(value) => {
        try {
            setIsLoading(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const erc20 = new ethers.Contract(ContractAddress, StockTokenABI, signer);
            await erc20.burn(value)
            setIsLoading(false)
            alert('Successfully burnt ' + value + ' tokens')

        } catch (error) {
            alert('Something went wrong ' + error)
        }
        setIsLoading(false)
    }
    const burnFromSpecificAddress = async (address,value) => {
        try {
            setIsLoading(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const erc20 = new ethers.Contract(ContractAddress, StockTokenABI, signer);
            await erc20.burnFrom(address,value)
            setIsLoading(false)
            alert('Successfully burnt ' + value + ' tokens from '+address)

        } catch (error) {
            alert('Something went wrong ' + error.message)
        }
        setIsLoading(false)
    }
   

    
    return (
        <StockContext.Provider value={{ 
            connectWallet, 
            error, 
            currentAccount, 
            connButtonText, 
            contractInfo, 
            getContract,
            isLoading,
            transferToken,
            burnToken,
            burnFromSpecificAddress,
            tokenBalance
        }}>
            {children}
        </StockContext.Provider>
    )
}


// const StockContext = () => {
//     return ( 
//         <div></div>
//      );
// }
 
// export default StockContext;







