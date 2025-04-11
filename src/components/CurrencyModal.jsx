"use client";

import { useState, useEffect } from "react";
import { getCurrencyRate } from "../services/currencyRates";
import { FaWindowClose } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export default function CurrencyModal({ currency, onClose }) {
  const [historicalRates, setHistoricalRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchHistoricalRates() {
      try {
        setLoading(true);
        const data = await getCurrencyRate(currency.code);
        if (data && data.length > 0) {
          const formattedData = data.map((rate) => ({
            date: rate.effectiveDate,
            rate: rate.mid,
          }));

          setHistoricalRates(formattedData);
        } else {
          setError("Brak danych historycznych dla tej waluty");
        }
      } catch (err) {
        setError(
          "Nie udało się pobrać danych historycznych. Spróbuj ponownie później."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistoricalRates();
  }, [currency.code]); 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-3 bg-green-600 text-white flex justify-between items-center">
          <h3 className="text-lg font-bold truncate">
            Ostatnie 10 notowań kursu średniego dla {currency.code} -{" "}
            {currency.currency}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          > <FaWindowClose size={30}/>
          </button>
        </div>

        <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <div className="h-48 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalRates}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="1"
                    stroke="rgba(255, 255, 255, 0.1)"
                  />

                  <ReferenceLine
                    y={
                      historicalRates.reduce(
                        (sum, item) => sum + item.rate,
                        0
                      ) / historicalRates.length
                    }
                    stroke="rgba(255, 255, 255, 0.5)"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="rgba(255, 255, 255, 0.7)"
                    tick={{ fontSize: 12, fill: "rgba(255, 255, 255, 0.7)" }}
                    tickMargin={20}
                  />

                  <YAxis
                    stroke="rgba(255, 255, 255, 0.7)"
                    tick={{ fontSize: 10, fill: "rgba(255, 255, 255, 0.7)" }}
                    tickFormatter={(value) => value.toFixed(4)}
                    domain={[]}
                    allowDataOverflow={false}
                  />
                  <Tooltip />
                  <Legend
                    wrapperStyle={{
                      color: "white",
                      fontSize: "10px",
                      paddingTop: "1.4rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    name={`${currency.code} Średnia wartość`}
                    stroke="rgb(34, 197, 94)"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 1, fill: "rgb(34, 197, 94)" }}
                    activeDot={{
                      r: 6,
                      strokeWidth: 2,
                    }}
                    connectNulls={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-base font-semibold mb-2 text-white">
              Aktualne kursy wymiany
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-700 p-3 rounded-md">
                <p className="text-xs sm:text-sm text-gray-400">
                  Kurs sprzedaży (Bank sprzedaje)
                </p>
                <p className="text-lg sm:text-xl font-bold text-white">
                  {currency.ask.toFixed(4)} PLN
                </p>
              </div>
              <div className="bg-gray-700 p-3 rounded-md">
                <p className="text-xs sm:text-sm text-gray-400">
                  Kurs kupna (Bank kupuje)
                </p>
                <p className="text-lg sm:text-xl font-bold text-white">
                  {currency.bid.toFixed(4)} PLN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
