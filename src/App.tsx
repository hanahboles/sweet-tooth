import './App.css'
import Slider from './components/Slider'
import Target from './components/Target'
import { useState, useRef } from 'react'

function App() {
  const [status, setStatus] = useState<string>('new')
  const [score, setScore] = useState<number>(0)
  const [targets, setTargets] = useState<number[]>([])
  const [speed, setSpeed] = useState<number>(5)
  const intervalRef = useRef<undefined | ReturnType<typeof setTimeout>>()

  const startNewGame = () => {
    createTargets()
    setStatus('active')
  }

  const pauseGame = () => {
    setStatus('paused')
    clearInterval(intervalRef.current)
  }

  const resumeGame = () => {
    setStatus('active')
    createTargets()
  }

  const onScore = () => {
    setScore(prevScore => prevScore + 1)
  }

  const handleBtnClick = () => {
    switch (status) {
      case 'new':
        startNewGame()
        break
      case 'active':
        pauseGame()
        break
      case 'paused':
        resumeGame()
        break
      default:
        break
    }
  }

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === 'paused') return
    setSpeed(parseInt(e.target.value))
  }

  const createTargets = () => {
    intervalRef.current = setInterval(createTarget, 1000)
  }

  const createTarget = () => {
    const randomId = Math.floor(Math.random() * 1000)
    setTargets(prevTargets => [...prevTargets, randomId])
  }

  const onTargetClick = (id: number) => {
    onScore()
    const newTargets = targets.filter(target => id !== target)
    setTargets(newTargets)
  }

  const buttonLabel = status === 'new' ? 'Start' : status === 'active' ? 'Pause' : 'Resume'

  return (
    <div className={`game-container ${status}`}>
      <div className="game-header">
        <div className="game-title"></div>
        <div className="game-controls">
          <Slider min={1} max={9} val={speed} label="Sugar Speed" onChange={handleSpeedChange}/>
          <div><span>Score: {score}</span></div>
          <button onClick={handleBtnClick} className="btn">{buttonLabel}</button>
        </div>
      </div>
      <div className="game">
        {targets && targets.map((target) =>
          <Target
            speed={speed}
            status={status}
            key={target}
            id={target}
            onClick={onTargetClick}
          />
        )}
      </div>
      <div className="paused-layer">Paused</div>
    </div>
  );
}

export default App;
