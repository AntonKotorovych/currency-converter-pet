import MainTitle from 'components/MainTitle';
import CurrencyRateTicker from 'components/CurrencyRateTicker';
import CurrencyConverterContainer from 'components/CurrencyConverterContainer';

export default function HomePage() {
  return (
    <>
      <MainTitle />
      <CurrencyRateTicker />
      <CurrencyConverterContainer />
    </>
  );
}
