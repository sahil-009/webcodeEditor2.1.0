

import PropTypes from 'prop-types';

const CustomInput = ({ customInput, setCustomInput }) => (
  <textarea
    placeholder="Enter custom input here"
    value={customInput}
    onChange={(e) => setCustomInput(e.target.value)}
  />
);

CustomInput.propTypes = {
  customInput: PropTypes.string.isRequired,
  setCustomInput: PropTypes.func.isRequired,
};



export default CustomInput;
