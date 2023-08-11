import "./App.css";
import { useEffect, useState } from "react";
  
function App() {
  
    //State for storing bill total with taxes
    const [billTaxes, setBillTaxes] = useState("");

    // State for storing bill total    
    const [bill, setBill] = useState("");
  
    // State for storing tip percentage
    const [tip, setTip] = useState("20%");

    // State for storing number of splits
    const [split, setSplit] = useState(1);
  
    // State for storing split total
    const [splitTotal, setSplitTotal] = useState(0);

    //State for storing tip in dollar
    const [tipTotal, setTipTotal] = useState(0)
  
    // Function to handle changes in the tip input
    function handleTipChange(e) {
        let value = e.target.value.replace("%", "");
        if (value.indexOf("%") === -1) {
            value = value + "%";
        }
        setTip(value);
    }
  
    // Function to handle changes in the
    // bill total input
    function handleBillChange(e) {
        setBill(e.target.value);
    }

    function handleBillTaxesChange(e) {
      setBillTaxes(e.target.value);
    }
  
    // Function to decrease the number of splits by 1
    function splitMinus() {
        setSplit((oldValue) => Math.max(oldValue - 1, 1));
    }
  
    // Function to increase the number of splits by 1
    function splitPlus() {
        setSplit((oldValue) => oldValue + 1);
    }
  
    // Function to calculate the split total 
    // based on bill, tip, and number of splits
    function calculate() {
        const percentage = 1 + parseInt(tip.replace("%", "")) / 100;
        const taxes = (billTaxes - bill) / split
        const result = ((bill * percentage) / split + taxes).toFixed(2);
        setSplitTotal(result);
    }

    //Function to calculate tip in dollar
    function tipCalculate() {
        const percentage = 1 + parseInt(tip.replace("%", "")) / 100;
        const tipInDollar = ((bill * percentage) - bill).toFixed(2)
        setTipTotal(tipInDollar);
    }
  
    // useEffect hook to calculate the split total
    // whenever bill, tip, or split changes
    useEffect(() => {
        calculate();
    }, [bill, billTaxes, tip, split]);

    useEffect(() => {
      tipCalculate();
    }, [bill, tip]);
  
    return (
        <main>
            {/* Bill total with taxes input */}
            <label>Bill total (with taxes)</label>
            <input
                type="text"
                placeholder={"0.00"}
                value={billTaxes}
                onChange={handleBillTaxesChange}
            />
            {/* Bill total without taxes input */}
            <label>Bill total (without taxes)</label>
            <input
                type="text"
                placeholder={"0.00"}
                value={bill}
                onChange={handleBillChange}
            />

            {/* Tip input */}
            <label>Tip</label>
            <input
                type="text"
                placeholder={"0.00"}
                value={tip}
                onChange={handleTipChange}
            />

            {/*total Tip in Dollar*/}
            <div className="tip">
                  <label>Total tip</label>
                  <span>{tipTotal}</span>
              </div>
  
            <div className="summary">
  
                {/* Split section */}
                <div className="split">
                    <label>Split</label>
                    <div className="split-control">
                        <button onClick={splitMinus}>-</button>
                        <span>{split}</span>
                        <button onClick={splitPlus}>+</button>
                    </div>
                </div>
  
                {/* Result section */}
                <div className="result">
                    <label>Split total</label>
                    <span>{splitTotal}</span>
                </div>
            </div>
        </main>
    );
}
  
export default App;