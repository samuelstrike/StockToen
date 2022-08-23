import { useContext,useEffect,useState } from "react";
import Spinner from '../Spinner'
import { StockContext } from "../../context/StockContext";
import Owner from "../dashboard/Owner";
import { ethers } from "ethers";
import { ContractAddress, StockTokenABI } from '../../constants/Constant'
const Card = () => {
    const { 
        error, 
        connectWallet, 
        getContract,
        isLoading,
        contractInfo,
        transferToken,
        currentAccount,
        burnToken,
        burnFromSpecificAddress
     } = useContext(StockContext)
    const [txs, setTxs] = useState([]); 
    const [contractListened, setContractListened] = useState();   

    useEffect(()=>{
        connectWallet()
        getContract()
      
    },[])
    
    useEffect(() => {
        if (currentAccount !== "") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const erc20 = new ethers.Contract(ContractAddress,StockTokenABI,provider)

            erc20.on("Transfer", (from, to, amount, event) => {
                console.log({ from, to, amount, event });

                setTxs((currentTxs) => [
                    ...currentTxs,
                    {
                        txHash: event.transactionHash,
                        from,
                        to,
                        amount: String(amount)
                    }
                ]);

            });
            setContractListened(erc20);

            return () => {
                contractListened.removeAllListeners();
            };
        }
        // eslint-disable-next-line
    }, [currentAccount]);
    return ( 

        <div className="">
            {isLoading && <div><Spinner /></div>}
                {error !== '' ? <div className="w-screen h-96 flex justify-center items-center fixed">
                <div className=" rounded-xl border border-red-500 p-8 md:p-20 bg-fuchsia-900 text-orange-400"> 
                    {error}
                </div>
                </div> : 
                <Owner 
                contractInfo={contractInfo} 
                isLoading={isLoading} 
                transferToken={transferToken} 
                txs={txs} 
                burnToken={burnToken}
                burnFromSpecificAddress={burnFromSpecificAddress} />
                }
           

        </div>

     );
}
 
export default Card;