import Navbar from "./components/Navbar";
import { StockProvider } from "./context/StockContext";

const Start = () => {
   
    
    return ( 
        <StockProvider>
            <div>
                <Navbar />
            </div>
        </StockProvider>
        
     );
}
 
export default Start;

