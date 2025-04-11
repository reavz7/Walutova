import React, { useState } from "react";

export default function CurrencyTable({ rates, onCurrencyClick }) {

  const [searchValue, setSearchValue] = useState("");


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-green-600 text-white">
        <h2 className="text-xl font-bold text-center">Kursy wymiany walut</h2>
        <p className="text-sm opacity-80 text-center">
          Kliknij na walutę, aby zobaczyć dane historyczne
        </p>  
      </div>  
      <div className="overflow-x-auto"> 
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th 
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Waluta
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Kod
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Kupno
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Sprzedaż
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {rates.map((rate) => (
              <tr 
                key={rate.code}
                onClick={() => onCurrencyClick(rate)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <td className="px-6 py-7 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {rate.currency}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white font-bold">
                    {rate.code}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {rate.bid.toFixed(4)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {rate.ask.toFixed(4)}
                  </div>
                    </td>
                </tr>
                
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
