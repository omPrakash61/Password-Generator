import { useCallback, useEffect, useState, useRef} from 'react'
import './App.css'

function App() {
  let [length, setLength] = useState(10)

  let [password, setPassword] = useState("")

  let [isNumber, setIsNumber] = useState(false)

  let [isSpecialChar, setIsSpecialChar] = useState(false)

  const generatePassword = useCallback(() => {
    let allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(isNumber){
      allChar += "0123456789";
    }
    if(isSpecialChar){
      allChar += "!@#$%^&*()_+[]{}|";
    }
    
    let pass = ""
    
    for(let i=0; i<length; i++){
      const idx = Math.floor(Math.random()*allChar.length) + 1
      let ch = allChar.charAt(idx);
      pass += ch;
    }
    
    setPassword(pass);
    

  }, [length, password, isNumber, isSpecialChar]);

  useEffect(() => {
    generatePassword();
  }, [ length, isNumber, isSpecialChar])

  const inputRef = useRef(null)
  
  function copyToClipBoard(){
    window.navigator.clipboard.writeText(password);
    inputRef.current?.select()
  }

  return (
    <>
      <div className='w-170 h-55 rounded-md bg-blue-950 pt-4.5'>
        <div className=''>
          <p className='text-3xl text-amber-300'>Password Generator</p>
        </div>
        <div className='flex justify-center'>
          <input value={password} ref={inputRef} type="text" className='mt-6 h-11.5 text-gray-900 p-3  bg-gray-200 w-80 rounded-l-2xl' readOnly />
          <button onClick={copyToClipBoard} id="copy" className='mt-6 rounded-r-2xl'>Copy</button>
        </div>
        <div className='gap-2 flex justify-center mt-4 text-amber-400'>
          <input onChange={(e) => setLength(e.target.value)} value={length} type="range" min={5} max={50} className='cursor-pointer h-5 w-30 bg-gray-100 ' placeholder='Length' />
          <label htmlFor="range">Length : {length}</label>

          <input type="checkbox" id="isNumber" onChange={() => setIsNumber((prev) => !prev)}  name="number" />
          <label htmlFor="number">Number</label>

          <input type="checkbox" id="isSpecialChar" onChange={() => setIsSpecialChar((prev) => !prev)} name="specialChar" />
          <label htmlFor="specialChar">Special Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
