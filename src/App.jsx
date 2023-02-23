import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scoreBoxes, setScoreBoxes] = useState([])
  const [currentBox, setCurrentBox] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const boxRefs = useRef([])

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

      if (clickedBox === scoreBoxes[currentBox]) {
        e.target.textContent = "";
        e.target.style.visibility = "hidden";

        if (currentBox < scoreBoxes.length - 1) {
          setCurrentBox(currentBox + 1);
          const nextBox = scoreBoxes[currentBox + 1];
          const nextBoxRef = boxRefs.current[nextBox];

          if (nextBoxRef) {
            nextBoxRef.textContent = currentBox + 2;
          }
        } else {
          alert("You won!");
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
    setGameStarted(true)
    let arr = []
    while (arr.length < 20) {
      let r = Math.floor(Math.random() * 64)
      if (arr.indexOf(r) === -1) arr.push(r)
    }
    console.log(arr)
    setScoreBoxes(arr)
  }

  function handleReset() {
    setGameStarted(false)

    // Set currentBox to 0 to start over
    setCurrentBox(0);

    // reset the box numbers and visibility
    boxRefs.current.forEach(box => {
      box.textContent = '';
      box.style.visibility = 'visible';
    });

    handleStart()
  }

  return (
    <div className="App">
      <h1>1to20</h1>
      <p>Made by <a href="https://trevortylerlee.com">Trevor Lee</a></p>

      <button onClick={handleReset} style={{marginBottom: "1rem"}}>Reset</button>

      <div className="game-wrapper">
        {boxes.map((box, index) => (
          <div
            className="box"
            key={index}
            id={index}
            ref={(ref) => (boxRefs.current[index] = ref)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App
