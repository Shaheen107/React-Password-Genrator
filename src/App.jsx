/* eslint-disable no-unused-vars */

// useCallback(fun, [dependency]) // yad rakta hai means ka hona wali changes ko cash mein rakta hai pher change hona per reload howa bagar change kerta hai

// useRef refrence daga aur ham pher os elemetn ka sath manupulation ker sakta hai 
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState();

  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[]|;:',.<>/?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char); // str mein jo rundom number ka index hoga wo mil jaya ga
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipbord = useCallback(()=>{
    passwordRef.current?.select();  // jo copy howa ose select kerka dekha daga ka ya copy howa
    passwordRef.current?.setSelectionRange(0,25)  // range bataya ga ka yaha tak select ho sakta hai
    window.navigator.clipboard.writeText(password)  // copy kerda ga password
  }, [password])

  useEffect(()=>{
    passwordGenrator();
  }, [length, numberAllowed, charAllowed, setPassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-8 py-3 mb-4 text-orange-500 bg-gray-700 px-4">
        <h1 className="text-center text-white py-2">Password Genrater</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} placeholder="password" className="w-full px-3 py-1 outline-none" ref={passwordRef} />
          <button className="outline-none bg-blue-700 px-3 pb-1 text-white shrink-0" onClick={copyPasswordToClipbord}>copy</button>
        </div>
        <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-1">
            <input type="range" id="range" min={6} max={50} style={{ cursor: "pointer" }} value={length} onChange={(e) => { setLength(e.target.value) }} />
            <label htmlFor="range">length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="num" style={{ cursor: "pointer" }}
              onChange={() => {
                setNumberAllowed((prev) => !prev) // click hona pa previse value change ho jaya gi ture to flause and vice virca
              }} />
            <label style={{ cursor: "pointer" }} htmlFor="num">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="char" style={{ cursor: "pointer" }}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }} />
            <label style={{ cursor: "pointer" }} htmlFor="char">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
