import PropTypes from 'prop-types';

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  step: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default function Input(props) {
  return (
    <div>
      <input {...props} />
    </div>
  );
}
