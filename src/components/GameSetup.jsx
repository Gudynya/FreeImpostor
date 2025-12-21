import { useState } from 'react'

function GameSetup({ onStart }) {
  const [numPlayers, setNumPlayers] = useState(4)
  const [enableHints, setEnableHints] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (numPlayers >= 3 && numPlayers <= 10) {
      onStart(numPlayers, enableHints)
    }
  }

  const handleChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 3 && value <= 10) {
      setNumPlayers(value)
    }
  }

  return (
    <div className="game-setup">
      <div className="container">
        <h1 className="title">El Impostor</h1>
        <p className="subtitle">¿Cuántos jugadores participarán?</p>
        
        <form onSubmit={handleSubmit} className="setup-form">
          <div className="player-input-group">
            <label htmlFor="players" className="label">
              Número de jugadores (3-10)
            </label>
            <div className="input-wrapper">
              <button
                type="button"
                className="btn-decrement"
                onClick={() => setNumPlayers(Math.max(3, numPlayers - 1))}
                disabled={numPlayers <= 3}
              >
                −
              </button>
              <input
                type="number"
                id="players"
                min="3"
                max="10"
                value={numPlayers}
                onChange={handleChange}
                className="player-input"
              />
              <button
                type="button"
                className="btn-increment"
                onClick={() => setNumPlayers(Math.min(10, numPlayers + 1))}
                disabled={numPlayers >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="hints-option">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={enableHints}
                onChange={(e) => setEnableHints(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-text">
                Dar pista al impostor
              </span>
            </label>
          </div>
          
          <button type="submit" className="btn-primary">
            Comenzar Juego
          </button>
        </form>
      </div>
    </div>
  )
}

export default GameSetup

