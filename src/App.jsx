import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState('');
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const inputRef = useRef(null);

  const generatePassword = useCallback(() => {
    let allChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (isNumber) allChar += '0123456789';
    if (isSpecialChar) allChar += '!@#$%^&*()_+[]{}|';

    let pass = '';
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * allChar.length);
      pass += allChar.charAt(idx);
    }

    setPassword(pass);
  }, [length, isNumber, isSpecialChar]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumber, isSpecialChar]);

  const copyToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    inputRef.current?.select();
  };

  return (
    <div className="bg-blue-950 text-white flex items-center rounded-xl justify-center">
      <div className="w-full max-w-md bg-blue-950 rounded-xl p-6 shadow-lg">
        <h1 className="text-center text-blue-300 mb-6">Password Generator</h1>

        <div className="flex items-center">
          <input
            type="text"
            value={password}
            ref={inputRef}
            readOnly
            className="w-full p-3 rounded-l-lg text-gray-900 bg-gray-100 focus:outline-none"
          />
          <button
            onClick={copyToClipBoard}
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-r-lg transition"
          >
            Copy
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-lg text-amber-500">Password Length: {length}</label>
            <input
              id="length"
              type="range"
              min={5}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-1/2 accent-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-numbers"
              checked={isNumber}
              onChange={() => setIsNumber((prev) => !prev)}
              className="accent-blue-500"
            />
            <label className='text-amber-500' htmlFor="include-numbers">Include Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-special"
              checked={isSpecialChar}
              onChange={() => setIsSpecialChar((prev) => !prev)}
              className="accent-blue-500"
            />
            <label className='text-amber-500' htmlFor="include-special">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
