import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scoreBoxes, setScoreBoxes] = useState([])
  const boxRefs = useRef([])

  const boxes = [...Array(64)].map((_, index) => index + 1)

  useEffect(() => {
    for (let i = 0; i < scoreBoxes.length; i++) {
      console.log("Scorebox", scoreBoxes[i])

      const boxRef = boxRefs.current[scoreBoxes[i]]
      if (boxRef) {
        boxRef.style.backgroundColor = "red"
        boxRef.textContent = i + 1
      }
    }
  }, [scoreBoxes])

  function handleStart() {
    console.log("Start")

    let arr = [];
    while (arr.length < 20) {
      let r = Math.floor(Math.random() * 64);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    console.log(arr);
    setScoreBoxes(arr)
  }

  function handleBoxClick(e) {
    console.log(e.target.id)
  }

  return (
    <div className="App">
      <h1>1to20</h1>
      <button onClick={handleStart}>Start</button>

      <div className="game-wrapper">
        {boxes.map((box, index) => (
          <div
            className="box"
            key={index}
            id={index}
            onClick={handleBoxClick}
            ref={(ref) => (boxRefs.current[index] = ref)}
          >
          </div>
        ))}
      </div>
    </div>
  )
}

export default App