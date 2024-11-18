

import PropTypes from 'prop-types';

const LanguageDropdown = ({ language, setLanguage }) => (
  <select value={language} onChange={(e) => setLanguage(e.target.value)}>
    <option value="javascript">JavaScript</option>
    <option value="python">Python</option>
    <option value="cpp">C++</option>
    <option value="java">Java</option>
  </select>
);

LanguageDropdown.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default LanguageDropdown;


