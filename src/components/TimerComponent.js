import React, { useState, useRef } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
        setMinutes((prevMinutes) => {
          if (prevMinutes === 59) {
            setHours((prevHours) => prevHours + 1);
            return 0;
          }
          return prevMinutes;
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsRunning(false);
    setLaps([]);
  };



  const lapTimer = () => {
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
      seconds
    )}`;
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const displayTime = () => {
    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8">{displayTime()}</h1>
      <div className="space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={stopTimer}
        >
          Stop
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={resetTimer}
        >
          Reset
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={lapTimer}
        >
          Lap
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Laps:</h2>

        {laps.length > 0 ? (
          <ul class="marker:text-sky-400 list-disc pl-5  text-lg  font-semibold space-y-3 text-slate-400">
            {laps.map((lap, index) => (
              <li key={index}>
                {`LAP ${index + 1}`}-{lap}
              </li>
            ))}
          </ul>
        ) : (
          <p>No laps recorded.</p>
        )}
      </div>
    </div>
  );
};

export default Timer;
