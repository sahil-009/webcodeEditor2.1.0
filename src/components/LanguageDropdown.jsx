
import PropTypes from 'prop-types';

const LanguageDropdown = ({ language, setLanguage }) => {
  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
  ];

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700"
    >
      {languages.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};
LanguageDropdown.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default LanguageDropdown;
