

import PropTypes from 'prop-types';

const Output = ({ output }) => (
  <div className="output-box">
    <h3>Output</h3>
    <pre>{output}</pre>
  </div>
);

Output.propTypes = {
  output: PropTypes.string.isRequired,
};

export default Output;


