
import PropTypes from 'prop-types';

const Output = ({ output, loading }) => {
  return (
    <div className="bg-gray-800 rounded p-4 h-[calc(60vh+8rem)] overflow-auto">
      <h2 className="text-xl mb-2">Output</h2>
      {loading ? (
        <div className="animate-pulse">Running code...</div>
      ) : (
        <pre className="whitespace-pre-wrap">{output}</pre>
      )}
    </div>
  );
};
Output.propTypes = {
  output: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Output;
