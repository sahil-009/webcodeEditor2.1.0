
import { useState } from 'react';
import Editor from './components/Editor';
import LanguageDropdown from './components/LanguageDropdown';
import CustomInput from './components/CustomInput';
import Output from './components/Output';
import ThemeToggle from './components/ThemeToggle';
import GitHubButton from './components/GitHubButton';
import './App.css';

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
          input,
        }),
      });

      const data = await response.json();
      setOutput(data.stdout || data.stderr || 'No output');
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error executing code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Web Code Editor</h1>
          <div className="flex items-center gap-4">
            <LanguageDropdown language={language} setLanguage={setLanguage} />
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <GitHubButton />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Editor
              code={code}
              setCode={setCode}
              language={language}
              theme={theme}
            />
            <CustomInput
              input={input}
              setInput={setInput}
              className="mt-4"
            />
          </div>
          <Output
            output={output}
            loading={loading}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Run Code'}
        </button>
      </div>
    </div>
  );
};

export default App;