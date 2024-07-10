import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const timerIdRef = useRef(null);
  const beepRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            beepRef.current.play().catch(error => console.error("Error playing beep:", error));
            if (isSession) {
              setIsSession(false);
              return breakLength * 60;
            } else {
              setIsSession(true);
              return sessionLength * 60;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
    }

    return () => clearInterval(timerIdRef.current);
  }, [isRunning, isSession, breakLength, sessionLength]);

  const handleReset = () => {
    clearInterval(timerIdRef.current);
    setIsRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    beepRef.current.pause();
    beepRef.current.currentTime = 0;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    beepRef.current.load();
  }, []);

  return (
    <div className="App">
      <div id="break-label">Break Length</div>
      <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
      <div id="break-length">{breakLength}</div>
      <button id="break-increment" onClick={handleBreakIncrement}>+</button>

      <div id="session-label">Session Length</div>
      <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
      <div id="session-length">{sessionLength}</div>
      <button id="session-increment" onClick={handleSessionIncrement}>+</button>

      <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>

      <button id="start_stop" onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button id="reset" onClick={handleReset}>Reset</button>

      <audio id="beep" ref={beepRef} src="https://www.soundjay.com/button/beep-07.wav" preload="auto" />
    </div>
  );
}

export default App;
