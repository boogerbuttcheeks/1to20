import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  const boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]

  function handleStart() {
    console.log("Start")
  }

  function handleBoxClick(e) {
    console.log(e.target.innerHTML)
  }
  
  return (
    <div className="App">
      <h1>1to20</h1>
      <button onClick={handleStart}>Start</button>

      <div className="game-wrapper">
        {boxes.map((box, index) => (
          <div className="box" key={index} onClick={(e) => {handleBoxClick(e)}}>
            {index}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
