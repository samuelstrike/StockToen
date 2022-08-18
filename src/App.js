import {useState,useEffect} from 'react'
import {ethers} from 'ethers'
import stockerc20token from './stockerc20token.json';
import TxList from './TxList';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner'
function App() {

  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();
  

  const [isLoading, setIsLoading] = useState(false);

  const [contractInfo, setContractInfo] = useState({
      address: "-",
      tokenName: "-",
      tokenSymbol: "-",
      totalSupply: "-"
  })
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-"
  });

  const [error, setError] = useState('');
  const [currentAccount,setCurrentAccount]=useState('')

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please install MetaMask")

    const account = await window.ethereum.request({ method: "eth_accounts"});

    if(account.length){
      setCurrentAccount(account[0]);
    } else {
      setError("Please Install MetaMask & Connect, and Reload")
    }
  }
  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please install MetaMask")

    const account = await window.ethereum.request({ method: "eth_requestAccounts" });
    setCurrentAccount(account[0])
  }

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(
        contractInfo.address,
        stockerc20token,
        provider
      );
      
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
  }, [contractInfo.address]);


  const getMyBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(contractInfo.address, stockerc20token, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await erc20.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance)
    });
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = new FormData(e.target);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(data.get("addr"), stockerc20token, provider)

      const tokenName = await erc20.name();
      const tokenSymbol = await erc20.symbol();
      const totalSupply = await erc20.totalSupply();

      setContractInfo({
        address: data.get("addr"),
        tokenName,
        tokenSymbol,
        totalSupply
      })
      alert("Successfully fetch the data from blockchain")
      
    } catch (error) {
      alert("Error with the Smart Contract address: " + error.message)
    }
    setIsLoading(false);
  }
  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractInfo.address, stockerc20token, signer);
    try {
      await erc20.transfer(data.get("recipient"), data.get("amount"));
      alert("Successfully transfered the stock token")
      setIsLoading(false);
      e.target.reset();
    }catch(e){
      alert("Cannot transfer the stock " + e)
      setIsLoading(false);
    }
   
  };
  return (
    <div className='container-fluid'>
      <Navbar/>
      {isLoading && <Spinner />}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div>
          <form className="m-4" onSubmit={handleSubmit}>
            <div className="credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
              <main className="mt-4 p-4">
                <h3 className="text-xl font-semibold text-gray-700 text-center">
                  Get Stock token information from block chain Network
                </h3>
                <div className="pt-2">
                  <div className="my-3">
                    <input
                      type="text"
                      name="addr"
                      className="input input-bordered block w-full focus:ring focus:outline-none form-control me-auto"
                      placeholder="Smart contract address"
                      required
                    />
                  </div>
                </div>
              </main>
              <footer className="p-4">
                <button
                  type="submit"
                  className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                >
                  Get Stock Information
                </button>
              </footer>
              <div className="px-4">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Total supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{contractInfo.tokenName}</th>
                          <td>{contractInfo.tokenSymbol}</td>
                          <td>{String(contractInfo.totalSupply)}</td>
                          <td>{contractInfo.deployedAt}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={getMyBalance}
                  type="submit"
                  className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                >
                  Get my balance
                </button>
              </div>
              <div className="px-4">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Address</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{balanceInfo.address}</th>
                          <td>{balanceInfo.balance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
          <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
            <div className="mt-4 p-4">
              <h3 className="text-xl font-semibold text-gray-700 text-center">
                Transfer Stock token 
              </h3>

              <form onSubmit={handleTransfer}>
                <div className="my-3">
                  <input
                    type="text"
                    name="recipient"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="Recipient address"
                    required
                  />
                </div>
                <div className="my-3">
                  <input
                    type="text"
                    name="amount"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="Amount to transfer"
                    required
                  />
                </div>
                <footer className="p-4">
                  <button
                    type="submit"
                    className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                  >
                    Send stock
                  </button>
                </footer>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
            <div className="mt-4 p-4">
              <h3 className="text-xl font-semibold text-gray-700 text-center">
                Recent transactions
              </h3>
              
                <TxList txs={txs} />
              
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
