import "./App.css";
// import { useState } from "react";

import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  let [password, setPassword] = useState("");
  let [length, setLength] = useState(8);
  let [hasNumbers, setHasNumbers] = useState(false);
  let [hasSymbols, setHasSymbols] = useState(false);

  let passwordGenerator = useCallback(() => {
    let password = "";
    let charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numSet = "0123456789";
    let symSet = "!@#$%^&*()_+";
    if (hasNumbers) charSet += numSet;
    if (hasSymbols) charSet += symSet;

    for (let i = 0; i < length; i++) {
      let at = Math.floor(Math.random() * charSet.length);
      password += charSet.charAt(at);
    }

    setPassword(password);
  }, [length, hasNumbers, hasSymbols, setPassword]);

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <>
      <div className="w-full h-screen bg-slate-700 flex justify-center items-center">
        <div className="w-2/3 max-w-xl h-32 bg-green-600 rounded-3xl p-5 flex flex-col gap-5">
          <div className="flex place-items-start w-full">
            <input
              type="text"
              placeholder="Password"
              className="px-6 py-2 w-full rounded-3xl"
              value={password}
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-700 px-6 py-2 rounded-3xl"
            >
              Copy
            </button>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              <input
                type="range"
                name="Length"
                id="Length"
                min={8}
                max={32}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="cursor-pointer"
              />
              <label className="mx-2 text-lg">Length: {length}</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                name="Numbers"
                id="Numbers"
                className="cursor-pointer"
                onChange={() => setHasNumbers((prev) => !prev)}
              />
              <label htmlFor="Numbers" className="mx-2 text-lg">
                Numbers
              </label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                name="Symbols"
                id="Symbols"
                className="cursor-pointer"
                onChange={() => setHasSymbols((prev) => !prev)}
              />
              <label htmlFor="Symbols" className="mx-2 text-lg">
                Symbols
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
