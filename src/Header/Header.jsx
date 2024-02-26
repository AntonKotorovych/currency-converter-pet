import Title from './Title';
import Counter from './Counter';
import PropTypes from 'prop-types';

Header.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};

// Max, very apologize for props drilling :D. It's just for first features test lol
export default function Header({ title, counter }) {
  return (
    <>
      <Title title={title} />
      <Counter counter={counter} />
    </>
  );
}
