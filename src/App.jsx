import { useState, useEffect, useRef } from 'react'
import useSound from 'use-sound';
import tapSfx from '/tap.mp3'
import resetSfx from '/reset.mp3'
import './App.css'

import Stopwatch from "./components/Stopwatch"

function App() {
  const [scoreBoxes, setScoreBoxes] = useState([])
  const [currentBox, setCurrentBox] = useState(0)
  const [timeStarted, setTimeStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const boxRefs = useRef([])

  const [playTap] = useSound(tapSfx, { volume: 0.25 })
  const [playReset] = useSound(resetSfx, { volume: 0.5 })

  const boxes = [...Array(64)].map((_, index) => index + 1)

  useEffect(() => {
    handleStart()
  }, [])

  useEffect(() => {
    const firstBox = scoreBoxes[0]
    const boxRef = boxRefs.current[firstBox]

    if (boxRef) {
      boxRef.textContent = 1
    }

    function handleBoxClick(e) {
      const clickedBox = parseInt(e.target.id);

      if (clickedBox === scoreBoxes[0]) {
        setTimeStarted(true)
      }

      if (clickedBox === scoreBoxes[currentBox]) {
        // e.target.textContent = "";
        // e.target.style.visibility = "hidden";
        e.target.style.background = "#646CFF";

        if (currentBox < scoreBoxes.length - 1) {
          setCurrentBox(currentBox + 1);
          const nextBox = scoreBoxes[currentBox + 1];
          const nextBoxRef = boxRefs.current[nextBox];

          if (nextBoxRef) {
            nextBoxRef.textContent = currentBox + 2;
          }
        } else {
          setTimeStarted(false)
          setGameFinished(true)
          console.log("You won!");
        }
      }
    }

    boxRefs.current.forEach((boxRef) => {
      boxRef.addEventListener('click', handleBoxClick)
    })

    return () => {
      boxRefs.current.forEach((boxRef) => {
        boxRef.removeEventListener('click', handleBoxClick)
      })
    }
  }, [scoreBoxes, currentBox])

  function handleStart() {
    let arr = []
    while (arr.length < 20) {
      let r = Math.floor(Math.random() * 64)
      if (arr.indexOf(r) === -1) arr.push(r)
    }
    setScoreBoxes(arr)
  }

  function handleReset() {
    setTimeStarted(false)
    setGameFinished(false)

    // Set currentBox to 0 to start over
    setCurrentBox(0);

    // reset the box numbers and visibility
    boxRefs.current.forEach(box => {
      box.textContent = '';
      box.style.background = "none";
    });

    handleStart()
  }

  return (
    <div className="App">
      <h1 className="title">1to20</h1>
      <p style={{marginBottom: "2rem"}}>Made by <a href="https://trevortylerlee.com">Trevor Lee</a></p>

      <div className="instructions">
      <button onClick={() => {
        playReset()
        handleReset()
      }}>Reset</button>

      <Stopwatch timeStarted={timeStarted} gameFinished={gameFinished}/>
      </div>

      <div className="game-wrapper">
        {boxes.map((box, index) => (
          <div
            className="box"
            key={index}
            id={index}
            ref={(ref) => (boxRefs.current[index] = ref)}
            onClick={playTap}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App
