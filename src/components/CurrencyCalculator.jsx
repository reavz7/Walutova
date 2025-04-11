import { useState, useEffect } from "react";

export default function CurrencyCalculator({ rates }) {
  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [buyResult, setBuyResult] = useState(0);
  const [sellResult, setSellResult] = useState(0);

  useEffect(() => {
    if (selectedCurrency && amount && rates) {
      const currency = rates.find(rate => rate.code === selectedCurrency);
      console.log(currency)
      if (currency) {
        setBuyResult(amount * currency.bid);
        setSellResult(amount * currency.ask);
      }
    } 
    if (amount <= 0) {
      setBuyResult(0);
      setSellResult(0); 
    }         
  }, [selectedCurrency, amount, rates]);

 const handleAmountChange = (e) => {
  const value = e.target.value === "" ? "" : Number.parseFloat(e.target.value)
   if (value >= 0) { 
     setAmount(value)
   }
   else if (isNaN(value)) { 
     setAmount(0)
  }
   else {
     setAmount(0)
   }
 };

  

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-green-600 text-white">
        <h1 className="text-xl font-bold text-center">Kalkulator walut</h1>
        <p className="text-sm opacity-80 text-center">Przelicz ile zapłacisz/otrzymasz za daną ilość obcej waluty💰</p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kwota
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            min="1"
            step="0.01"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Waluta
          </label>
          <select
            id="currency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          >
            {rates.map((rate) => (
              <option key={rate.code} value={rate.code}>
                {rate.code} - {rate.currency}
              </option>
            ))}
          </select>
        </div>
        <div></div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="flex flex-col items-center text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                <span className="whitespace-normal">
                  Podana ilość {selectedCurrency} <span className="text-red-400">będzie kosztować</span>
                </span>
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{sellResult.toFixed(2)} PLN</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                1 {selectedCurrency} = {rates.find((r) => r.code === selectedCurrency)?.ask.toFixed(4) || 0} PLN
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                <span className="whitespace-normal">
                  Za podaną ilość {selectedCurrency} <span className="text-yellow-400">otrzymasz</span>
                </span>
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{buyResult.toFixed(2)} PLN</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                1 {selectedCurrency} = {rates.find((r) => r.code === selectedCurrency)?.bid.toFixed(4) || 0} PLN
              </p>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}