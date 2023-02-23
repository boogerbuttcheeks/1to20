import { useState, useEffect } from "react";

// https://github.com/w3collective/react-stopwatch

export default function Stopwatch({timeStarted, gameFinished}) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (timeStarted) {
      setRunning(true)
    } else if (gameFinished) {
      setRunning(false)
      console.log("Your time was " + time)
    } else {
      setRunning(false)
      setTime(0)
    }
  }, [timeStarted, gameFinished])

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <div>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      {/* <div className="buttons">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div> */}
    </div>
  );
};
