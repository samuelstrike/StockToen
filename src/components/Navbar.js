import { useContext} from "react";
import { StockContext } from "../context/StockContext";
const Navbar = () => {
    const {connectWallet, currentAccount, connButtonText } =useContext(StockContext)
    
   
 
    
    return (

        <nav className="bg-fuchsia-900 p-4 h-full min-w-fit flex justify-between">
            <div className="text-orange-400 text-xl font-bold">
            Stock Token
           </div>
            {connButtonText !== '' ? <div className="">
                <button onClick={connectWallet} className=" bg-transparent hover:bg-blue-500 text-orange-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    {connButtonText}
                </button>
            </div> : <div className=" md:flex justify-between">
                <p className="text-orange-400 font-bold">Your Address: </p>
                    <span className="text-white ml-2">{currentAccount.toString()}</span>
            </div> }
            
           
        </nav>


    );
}

export default Navbar;