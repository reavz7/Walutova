import Header from './components/Header'
import CurrencyPage from './pages/CurrencyPage'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200 dark:bg-gray-700 overflow-hidden">
      <Header />
      <CurrencyPage />
      <Footer/>
    </div>
  )
}

export default App
