
import PropTypes from 'prop-types';

const CustomInput = ({ input, setInput }) => {
  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Custom input..."
      className="w-full h-32 bg-gray-800 text-white p-4 rounded border border-gray-700"
    />
  );
};
CustomInput.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
};


export default CustomInput;