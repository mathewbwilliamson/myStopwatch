import React from 'react'
import {useState, useEffect, useRef} from 'react'
import './timer.css'
import base from './base'
import {firestore} from 'firebase'


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
  // [matt]: Right now, this runs every single time it renders which will be a big performance hit
  // const initialLapse = Number(window.localStorage.getItem('time lapse') || 0)
  const initialLapse = () => Number(window.localStorage.getItem('time lapse') || 0)
  const initialSavedTimes = JSON.parse(window.localStorage.getItem('saved times')) || []
  
  const [lapse, setLapse] = useState(initialLapse)
  const [running, setRunning] = useState(false)
  const [savedTimes, setSavedTimes] = useState(initialSavedTimes)
  const timerRef = useRef()
  const [visible, setVisible] = useState('invisible')

  useEffect(() => {
    return function cleanup() {
    clearInterval(timerRef.current)
    }
  }, [])

  // [matt]: This runs after every render!
  // useEffect(() => {
  //   window.localStorage.setItem('time lapse', lapse)
  // })
  
  // [matt]: This makes it render only when lapse changes
  useEffect(() => {
    window.localStorage.setItem('time lapse', lapse)
  }, [lapse])

  useEffect(() => {
    window.localStorage.setItem('saved times', JSON.stringify(savedTimes))
  }, [savedTimes])
  
  useEffect(() => {    
    if (savedTimes.length === 0) {
      setVisible('invisible')
    } else {
      setVisible('')
    }
  }, [savedTimes])

  // useEffect(() => {
  //   const ref = base.syncState(`mystopwatchtracker`, {
  //     context: {
  //       setState: ({ savedTimes }) => setSavedTimes({ ...savedTimes }),
  //       state: { savedTimes },
  //     },
  //     state: 'savedTimes'
  //   })
  // }, [])
    
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
    setVisible('')     
    setLapse(0)
    setRunning(false)
  }

  function handleClearAllClick() {
    clearInterval(timerRef.current)
    setSavedTimes([])      
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
        
        <div>
          {savedTimes && savedTimes.map((time, index) => (
            <div key={time + index}>
                <ul>
                  <li>{convertTime(time)}</li>
                </ul>
                <div className="seperator"></div>
              </div>
            )
            )
          }
          <button onClick={handleClearAllClick} className={`clearAllButton ${visible}`}>Clear ALL</button>
        </div>
      </div>
    )
  }

export default Stopwatch