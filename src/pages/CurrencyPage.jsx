import { useEffect, useState } from "react";
import CurrencyCalculator from "../components/CurrencyCalculator";
import { getExchangeRates } from "../services/currencyRates";
import CurrencyTable from "../components/CurrencyTable";
import CurrencyModal from "../components/CurrencyModal";
import { currencies } from "../helpers/currencies";
export default function CurrencyPage() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const data = await getExchangeRates();
        const ratesFiltered = data.filter((rate) =>
          currencies.includes(rate.code)
        );
        setRates(ratesFiltered);
        setError(null);
      } catch (error) {
        setError("Nie udało się pobrać danych. Spróbuj ponownie później.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();

    // refresh co 5 minut, zeby wartosc kupna/sprzedazy waluty byla mozliwie jak najbardziej aktualna
    const refresh = setInterval(fetchRates, 300000);
    return () => clearInterval(refresh);
  }, []);

  const handleCurrencyClick = (currency) => {
    setSelectedCurrency(currency)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
 
  return (
    <main className="flex-1 flex container mx-auto px-4 py-8 justify-center items-center">
      {loading ? (
        //   animacja ladowania
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        //   powiadomienie w przypadku bledu
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <CurrencyCalculator rates={rates} />
            <CurrencyTable rates={rates} onCurrencyClick={handleCurrencyClick}/>
          </div>
          {showModal && selectedCurrency && (
            <CurrencyModal 
              currency={selectedCurrency} 
              onClose={closeModal} 
            />
          )}
              

        </>
      )}
    </main>
  );
}
