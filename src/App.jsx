import HomePage from './pages/HomePage';
import { ExchangeRatesProvider } from './store/ExchangeRatesProvider';

export default function App() {
  return (
    <ExchangeRatesProvider>
      <HomePage />
    </ExchangeRatesProvider>
  );
}
