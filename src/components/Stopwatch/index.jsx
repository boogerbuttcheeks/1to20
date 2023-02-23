import { useState, useEffect } from "react";

// https://github.com/w3collective/react-stopwatch

export default function Stopwatch({timeStarted, gameFinished}) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [bestTimeSaved, setBestTimeSaved] = useState(false);

  // Run when game is over
  useEffect(() => {
    if (gameFinished && !bestTimeSaved) {
      let bestTimes = JSON.parse(localStorage.getItem("bestTimes"));
      console.log(bestTimes);

      if (bestTimes === null) {
        bestTimes = [];
      }

      // Add the current time to the list of best times
      bestTimes.push({ time, timestamp: new Date().getTime() });

      // Sort the best times array in ascending order of time
      bestTimes.sort((a, b) => a.time - b.time);

      // Truncate the array to the top 10 fastest times
      bestTimes = bestTimes.slice(0, 10);

      // Save the updated best times array to local storage
      localStorage.setItem("bestTimes", JSON.stringify(bestTimes));

      // Set the state variable to true to indicate that the best time has been saved
      setBestTimeSaved(true);
    }
  }, [gameFinished, time, bestTimeSaved]);

  useEffect(() => {
    if (timeStarted) {
      setRunning(true)
      setBestTimeSaved(false)
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
