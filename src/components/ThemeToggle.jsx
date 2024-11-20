
import PropTypes from 'prop-types';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded border border-gray-700 hover:bg-gray-700"
    >
      {theme === 'vs-dark' ? '☀️' : '🌙'}
    </button>
  );
};
ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default ThemeToggle;
