import React from 'react'
import {useState, useEffect, useRef} from 'react'

const buttonStyles = {
    border: '1px solid #ccc',
    background: '#fff',
    fontSize: '2em',
    padding: 15,
    margin: 5,
    width: 200,
}

// 1. Make it small friendly
// 2. Start saving the times and never clear 
// Ex: Start Button, Clear Button (saves to state, clears the main screen, adds to bottom)
// 3. Maybe even make a database in Google Firebase that stores the times for each day.
// Write up a quick Readme
// Clean up code
// Put on my GitHub/portfolio as a small demo of learning React Hooks


function Stopwatch() {
    const [lapse, setLapse] = useState(0)
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
      const seconds = Math.floor(time / 1000)
      const minutes = Math.floor((time / 1000) / 60)
      const hours = Math.floor(time / 1000 / 60 / 60)

      let minutePadding = ''
      if (minutes < 10) {
        minutePadding = 0
      }

      let secondPadding = ''
      if (seconds < 10) {
        secondPadding = 0
      }

      return `${hours}:${minutePadding}${minutes}:${secondPadding}${seconds}`
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
        <button onClick={handleRunClick} style={buttonStyles}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleClearClick} style={buttonStyles}>
          Clear
        </button>

        {savedTimes && savedTimes.map(time => (
            <ul>
              <li>{convertTime(time)}</li>
            </ul>
          )
        )
        }
      </div>
    )
  }

export default Stopwatch