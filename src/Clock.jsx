// import {useState} from "react";
// import Length from './Length'; 
// import './Clock.css';


// export default function Clock(){

//     const [displayTime, setDisplayTime] = useState(25*60);
//     const [breakTime, setBreakTime] = useState(5*60);
//     const [sessionTime, setSessionTime] = useState(25*60);
//     const [timerOn, setTimerOn] = useState(false);
// const [onBreak, setOnBreak] = useState(false);

//     const formatTime = (time)=>{
//         let minutes = Math.floor(time/60);
//         let seconds = time% 60;
//         return(
//             (minutes < 10 ? "0" + minutes : minutes)+":" + (seconds < 10 ? "0" + seconds : seconds)
//         );
//     };

//     const changeTime = (amount)=>{
// if(type == 'break'){
//     if(breakTime <=60 && amount < 0){
//         return;
//     }
//     setBreakTime((prev)=> prev + amount);
// }else{
//     if(breakTime <=60 && amount < 0){
//         return;
//     }
//     setSessionTime((prev)=> prev + amount);
//     if(!timerOn){
//         setDisplayTime(sessionTime + amount);
//     }
//  }
//     };
// const controlTime =()=>{
//     let second = 1000;
//     let date = new Date().getTime();
//     let nextDate = new Date().getTime()+second;
//     let onBreakVariable= onBreak;
//     if(!timerOn){
//         let interval = setInterval(()=>{
//             date= new Date().getTime();
//             if(date > nextDate){
//                 setDisplayTime(prev =>{
//                     return prev -1;
//                 })
//             }
//             nextDate += second;
//         }, 30)
//     }
// }
// const resetTime =()=>{
//     setDisplayTime(25*60);
//     setBreakTime(5*60);
//     setSessionTime(25*60);

// }

//      return(
//         <div className="center-align">
//             <h1>Pomodoro Clock</h1>
//             <div className="dual-container">
//  <Length title={"break length"} changeTime={changeTime} type={"break"} time={breakTime} formatTime={formatTime} />
//  <Length title={"break length"} changeTime={changeTime} type={"break"} time={breakTime} formatTime={formatTime} />
//             </div>
//             <h1>{formatTime(displayTime)}</h1>
//             <button className="btn-large deep-purple lighten-2" onClick={controlTime}>
//                 {timerOn ? (
//                     <i className="material-icon">pause_circle_filled</i>
//                 ):(<i className="material-icons">play_circle_filled</i>)}
//             </button>
// <button className="btn-large deep-purple lighten-2" onClick={resetTime}>
//     <i className="material-icons">autorenew</i>
//     </button>         
// </div>
//     )
// }


import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerIdRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
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
    </div>
  );
}

export default App;
