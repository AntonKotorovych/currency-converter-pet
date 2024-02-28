import CurrencyRateTicker from '../../components/CurrencyRateTicker';
import Card from '../../components/Card';
import MainTitle from '../../components/MainTitle';

export default function HomePage() {
  return (
    <>
      <MainTitle />
      <Card>
        <CurrencyRateTicker />
      </Card>
    </>
  );
}
