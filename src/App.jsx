import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scoreBoxes, setScoreBoxes] = useState([])
  const [currentBox, setCurrentBox] = useState(0)
  const boxRefs = useRef([])

  const boxes = [...Array(64)].map((_, index) => index + 1)

  useEffect(() => {
    const firstBox = scoreBoxes[0]
    const boxRef = boxRefs.current[firstBox]

    if (boxRef) {
      boxRef.textContent = 1
    }

    function handleBoxClick(e) {
      const clickedBox = parseInt(e.target.id)

      if (clickedBox === scoreBoxes[currentBox]) {
        if (currentBox < scoreBoxes.length - 1) {
          setCurrentBox(currentBox + 1)
          const nextBox = scoreBoxes[currentBox + 1]
          const nextBoxRef = boxRefs.current[nextBox]

          if (nextBoxRef) {
            nextBoxRef.textContent = currentBox + 2
          }
        } else {
          alert('You won!')
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
    console.log(arr)
    setScoreBoxes(arr)
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
            ref={(ref) => (boxRefs.current[index] = ref)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App
