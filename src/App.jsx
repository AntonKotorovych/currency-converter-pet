import HomePage from './pages/HomePage';
import { ExchangeRatesProvider } from './store/ExchangeRatesContext';

export default function App() {
  return (
    <ExchangeRatesProvider>
      <HomePage />
    </ExchangeRatesProvider>
  );
}
