
import PropTypes from 'prop-types';
import MonacoEditor from '@monaco-editor/react';

const Editor = ({ code, setCode, language, theme }) => {
  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div className="border border-gray-700 rounded">
      <MonacoEditor
        height="60vh"
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
};
Editor.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};


export default Editor;