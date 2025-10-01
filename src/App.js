// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(100);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [amountInput, setAmountInput] = useState(100);
  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        console.log(data);
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      }
      if (fromCur === toCur) return setConverted(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div>
      <input
        type="text"
        // value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
        value={amountInput}
        onChange={(e) => setAmountInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setAmount(Number(amountInput));
          }
        }}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        {/* <option value="PKR">PKR</option> */}
      </select>
      <p>
        {converted} {toCur}
      </p>
    </div>
  );
}
