
import MonacoEditor from 'react-monaco-editor';
import PropTypes from 'prop-types';

const Editor = ({ code, setCode, theme, language }) => {
  const handleEditorChange = (newValue) => {
    setCode(newValue);
  };

  return (
    <MonacoEditor
      height="400px"
      language={language}
      theme={theme}
      value={code}
      onChange={handleEditorChange}
    />
  );
};
Editor.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};


export default Editor;
