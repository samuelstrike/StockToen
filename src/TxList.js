export default function TxList({ txs }) {
    if (txs.length === 0) return null;
    return (
        
            <div>
            {txs.map((item) => (
                <div key={item.txHash} className="alert alert-danger">
                    <div>
                        <p>From: {item.from}</p>
                        <p>To: {item.to}</p>
                        <p>Amount: {item.amount}</p>
                        <a href={`https://sepolia.etherscan.io/tx/${item.txHash}`} >
                            Check in block explorer
                        </a>
                    </div>
                </div>
            ))}
            </div>
        
    );
}
