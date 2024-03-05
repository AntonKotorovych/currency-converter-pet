import MainTitle from 'components/MainTitle';
import CurrencyRateTicker from 'components/CurrencyRateTicker';
import CurrencyConverter from 'components/CurrencyConverter';

export default function HomePage() {
  return (
    <>
      <MainTitle />
      <CurrencyRateTicker />
      <CurrencyConverter />
    </>
  );
}
