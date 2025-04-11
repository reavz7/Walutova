import axios from "axios"
const URL = "https://api.nbp.pl/api/"

// pobieranie kurs walut
export const getExchangeRates = async () => {
  try {
    const response = await axios.get(`${URL}exchangerates/tables/C/?format=json`)
    console.log(response.data[0].rates) 
    return response.data[0].rates
  } catch (error) {
    console.error("Error fetching exchange rates", error)
    throw error
  }
}

// pobieranie średniego kursu waluty
export const getCurrencyRate = async (currencyCode) => {
  try {
    const response = await axios.get(`${URL}exchangerates/rates/A/${currencyCode}/last/10/?format=json`) 
    // console.log(response.data.rates) test
    return response.data.rates
  } catch (error) {
    console.error(`Error fetching rate for ${currencyCode}:`, error)
    throw error
  }
}

