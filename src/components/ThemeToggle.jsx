

import PropTypes from 'prop-types';

const ThemeToggle = ({ theme, setTheme }) => (
  <button onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}>
    Change Theme
  </button>
);

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default ThemeToggle;


