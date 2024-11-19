import { useState } from 'react';
import axios from 'axios';

import Editor from './components/Editor';
import Output from './components/Output';
import LanguageDropdown from './components/LanguageDropdown';
import ThemeToggle from './components/ThemeToggle';
import GitHubButton from './components/GitHubButton';
import CustomInput from './components/CustomInput';
import './App.css';

const App = () => {
  const [code, setCode] = useState('Write your code here');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [customInput, setCustomInput] = useState('');

  const executeCode = async () => {
    try {
      const response = await axios.post('http://194.195.117.239:3000/execute', {
        language,
        code,
        input: customInput,
      });

      // Handle successful API response
      setOutput(response.data.stdout || response.data.stderr || 'No output');
    } catch (error) {
      console.error('Error executing code:', error);

      // Handle specific error responses from backend (e.g., invalid language, execution errors)
      if (error.response && error.response.data) {
        setOutput(error.response.data.error || 'Error during execution');
      } else {
        setOutput('Error: Unable to connect to server.');
      }
    }
  };

  const handleRun = () => {
    if (!language || !code) {
      setOutput('Please select a language and write your code');
      return;
    }

    setOutput('Executing...'); // Show loading state before actual execution
    executeCode();
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <div className="header">
        <LanguageDropdown language={language} setLanguage={setLanguage} />
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <GitHubButton />
      </div>

      {/* Editor and Output Section  */}
      <div className="editor-container">
        <Editor code={code} setCode={setCode} theme={theme} language={language} />
        <Output output={output} />
      </div>

      {/* Footer Section custom input */}
      <div className="footer">
        <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
        <button onClick={handleRun}>Run</button>
      </div>
    </div>
  );
};

export default App;