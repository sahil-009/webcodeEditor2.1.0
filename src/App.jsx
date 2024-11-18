import { useState } from 'react';
import axios from 'axios';

// import MonacoEditor from 'react-monaco-editor';

import Editor from './components/Editor';
import Output from './components/Output';
import LanguageDropdown from './components/LanguageDropdown';
import ThemeToggle from './components/ThemeToggle';
import GitHubButton from './components/GitHubButton';
import CustomInput from './components/CustomInput';
import './App.css';

const App = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [customInput, setCustomInput] = useState('');

  const handleRun = async () => {
    try {
      const response = await axios.post('http://172.105.52.188:2358/', {
        language,
        code,
        input: customInput,
      });
      setOutput(response.data.output);
    } catch {
      setOutput('Error: Unable to execute the code.');
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <LanguageDropdown language={language} setLanguage={setLanguage} />
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <GitHubButton />
      </div>
      <div className="editor-container">
        <Editor code={code} setCode={setCode} theme={theme} language={language} />
        <Output output={output} />
      </div>
      <div className="footer">
        <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
        <button onClick={handleRun}>Run</button>
      </div>
    </div>
  );
};

export default App;
