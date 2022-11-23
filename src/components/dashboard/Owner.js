import { useState } from 'react'
import Spinner from '../Spinner'
import TxList from '../../TxList'
const Owner = ({ contractInfo, isLoading, transferToken, txs, burnToken, burnFromSpecificAddress }) => {


    const [tokenAmount, setTokenAmount] = useState(0)
    const [transferAccount, setTransferAccount] = useState('')

    const handleTransfer = (e) =>{
        e.preventDefault()
        transferToken(transferAccount,tokenAmount)
        e.target.reset();
    }
    const handleBurn = (e) => {
        e.preventDefault()
        burnToken(tokenAmount)
        e.target.reset();
    }
   
    return ( 

        <div>
            {isLoading && <div><Spinner /></div>}
            <div className="bg-white w-auto h-max p-4 mt-2 rounded-lg shadow-xl mx-2">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <div className='font-extrabold'>Stock Name</div>
                        <div className='text-orange-400 font-black'>{contractInfo.tokenName}</div>
                    </div>
                    <div className="flex space-x-4">
                        <div className='font-extrabold'>Stock Symbol</div>
                        <div className='text-orange-400 font-black'>{contractInfo.tokenSymbol}</div>
                    </div>
                    <div className="flex space-x-4">
                        <div className='font-extrabold'>Total Supply</div>
                        <div className='text-orange-400 font-black'>{contractInfo.totalSupply} in <span className='text-black'>Wei</span></div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
                <div>
                    <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                        <div className="mt-4 p-4">
                            <h3 className="text-xl font-semibold text-gray-700 text-center">
                                Burn Stock token
                            </h3>

                            <form onSubmit={handleBurn}>
                                
                                <div className="my-3">
                                    <input
                                        type="text"
                                        name="amount"
                                        className="input input-bordered block w-full focus:ring focus:outline-none focus:rounded-sm"
                                        placeholder="Nos of token to be burnt"
                                        onChange={(e) => setTokenAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <footer className="p-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                                    >
                                        Burn stock
                                    </button>
                                </footer>
                            </form>
                        </div>
                    </div>
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
                                        className="input input-bordered block w-full focus:ring focus:outline-none focus:rounded-sm"
                                        placeholder="Recipient address"
                                        onChange={(e) => setTransferAccount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="my-3">
                                    <input
                                        type="text"
                                        name="amount"
                                        className="input input-bordered block w-full focus:ring focus:outline-none focus:rounded-sm"
                                        placeholder="Amount to transfer"
                                        onChange={(e) => setTokenAmount(e.target.value)}
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
                    <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white min-w-min">
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
    
    //     <div className="grid grid-cols-1 gap-2 md:grid-cols-2 m-2 md:gab-1">
    //         <div>
    //             <div className="w-full shadow-lg mx-auto rounded-xl bg-white md:w-3/4 mt-4 p-4">
    //                 <h3 className="text-xl font-semibold text-gray-700 text-center">
    //                     Transfer Stock token
    //                 </h3>
    //                 <form>
    //                     <div className="my-3">
    //                         <input
    //                             type="text"
    //                             name="recipient"
    //                             className="input input-bordered block w-full focus:ring focus:outline-none focus:rounded"
    //                             placeholder="Recipient address"
    //                             required
    //                         />
    //                     </div>
    //                     <div className="my-3">
    //                         <input
    //                             type="text"
    //                             name="amount"
    //                             className="input input-bordered block w-full focus:ring focus:outline-none focus:rounded"
    //                             placeholder="Amount to transfer"
    //                             required
    //                         />
    //                     </div>
    //                     <footer className="p-4">
    //                         <button
    //                             type="submit"
    //                             className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
    //                         >
    //                             Send stock
    //                         </button>
    //                     </footer>
    //                 </form>

    //             </div>
    //             <div className="w-full shadow-lg mx-auto rounded-xl bg-white md:w-3/4 mt-4 p-4">
    //                 <h3 className="text-xl font-semibold text-gray-700 text-center">
    //                     Transfer Stock token
    //                 </h3>
    //                 <form>
    //                     <div className="my-3">
    //                         <input
    //                             type="text"
    //                             name="recipient"
    //                             className="input input-bordered block w-full focus:ring focus:outline-none focus:rounded"
    //                             placeholder="Recipient address"
    //                             required
    //                         />
    //                     </div>
    //                     <div className="my-3">
    //                         <input
    //                             type="text"
    //                             name="amount"
    //                             className="input input-bordered block w-full focus:ring focus:outline-none focus:rounded"
    //                             placeholder="Amount to transfer"
    //                             required
    //                         />
    //                     </div>
    //                     <footer className="p-4">
    //                         <button
    //                             type="submit"
    //                             className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
    //                         >
    //                             Send stock
    //                         </button>
    //                     </footer>
    //                 </form>
    //             </div>
    //             <div className="w-full shadow-lg mx-auto rounded-xl bg-white md:w-3/4 mt-4 p-4">
    //                 03
    //             </div>
    //             <div className="w-full shadow-lg mx-auto rounded-xl bg-white md:w-3/4 mt-4 p-4">
    //                 04
    //             </div>
    //             <div className="w-full shadow-lg mx-auto rounded-xl bg-white md:w-3/4 mt-4 p-4">
    //                 05
    //             </div>
    //             <div className="w-full shadow-lg mx-auto rounded-xl bg-white md:w-3/4 mt-4 p-4">
    //                 06
    //             </div>
    //             <div className="w-full shadow-lg mx-auto rounded-xl bg-white md:w-3/4 mt-4 p-4">
    //                 06
    //             </div>
    //         </div>
    //         <div className="w-full shadow-lg mx-auto rounded-xl bg-white md:w-3/4 mt-4 p-4">
    //             <h1>helo</h1>
    //         </div>
            
    //    </div>
        
       
     );
}
 
export default Owner;