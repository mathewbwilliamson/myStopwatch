import React from 'react'
import {useState, useEffect, useRef} from 'react'
import './timer.css'
import base from './base'

const buttonStyles = {
    border: '1px solid #519D9E',
    background: '#fff',
    fontSize: '2em',
    padding: 15,
    margin: 5,
    width: 100,
}

const runningButtonStyles = {
  border: '1px solid #519D9E',
  background: '#D1B6E1',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 100,
}

function Stopwatch() {
    const [lapse, setLapse] = useState(50)
    const [running, setRunning] = useState(false)
    const [savedTimes, setSavedTimes] = useState([])
    const timerRef = useRef()
  
    useEffect(() => {
      return function cleanup() {
      clearInterval(timerRef.current)
      }
    }, [])
  
    function handleRunClick() {
      if (running) {
        clearInterval(timerRef.current)
      } else {
        const startTime = Date.now() - lapse
        timerRef.current = setInterval(() => setLapse(Date.now() - startTime), 0)
      }
      convertTime(lapse)
      
      setRunning(!running)
    }
  
    function handleClearClick() {
      clearInterval(timerRef.current)
      setSavedTimes([...savedTimes, lapse])      
      setLapse(0)
      setRunning(false)
    }

    function convertTime(time) {
      let seconds = Math.floor(time / 1000)
      if (seconds > 0) {        
        seconds = seconds - Math.floor(seconds / 60) * 60
      }
      let secondPadding = ''
      if (seconds < 10) {
        secondPadding = 0
      }

      let minutes = Math.floor((time / 1000) / 60)
      if (minutes > 0) {        
        minutes = minutes - Math.floor(minutes / 60) * 60
      }
      let minutePadding = ''
      if (minutes < 10) {
        minutePadding = 0
      }

      const hours = Math.floor(time / 1000 / 60 / 60)

      return `${hours}:${minutePadding}${minutes}:${secondPadding}${seconds}`
    }

    let btnStyles = buttonStyles

    if (running) {
      btnStyles = runningButtonStyles
    }
  
    return (
      <div style={{textAlign: 'center'}}>
        <label
          style={{
            fontSize: '5em',
            display: 'block',
          }}
        >
          {convertTime(lapse)}
        </label>
        
        <button onClick={handleRunClick} style={btnStyles}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleClearClick} style={btnStyles}>
          Clear
        </button>

        {savedTimes && savedTimes.map((time, index) => (
            <div key={time}>
              <ul>
                <li>{convertTime(time)}</li>
              </ul>
              <div className="seperator"></div>
            </div>
          )
        )
        }
      </div>
    )
  }

export default Stopwatch