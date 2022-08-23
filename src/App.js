import Card from "./components/card/Card";
import Navbar from "./components/Navbar";
import { StockProvider } from "./context/StockContext";

const APP = () => {

  return (
   <StockProvider>
      <main className="min-h-screen bg-gray-200">
        <Navbar />
        <Card />
      </main>
   </StockProvider>
    

  );
}

export default APP;