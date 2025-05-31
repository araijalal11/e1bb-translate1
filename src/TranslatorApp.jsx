
import { useState } from 'react';

function TranslatorApp() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('ku-en');

  const translateText = async () => {
    const langpair = mode === 'ku-en' ? 'ku|en' : 'en|ku';
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`
    );
    const data = await response.json();
    setResult(data.responseData.translatedText);
  };

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <h1>e.1bb Translate</h1>
      <div style={{ margin: '1rem 0' }}>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value='ku-en'>Kurdish → English</option>
          <option value='en-ku'>English → Kurdish</option>
        </select>
      </div>
      <textarea
        rows={5}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Enter text...'
        style={{ marginBottom: '1rem' }}
      />
      <br />
      <button onClick={translateText} style={{ marginBottom: '1rem' }}>Translate</button>
      <div>
        <textarea rows={5} cols={50} value={result} readOnly placeholder='Translation will appear here...' />
      </div>
    </div>
  );
}

export default TranslatorApp;
