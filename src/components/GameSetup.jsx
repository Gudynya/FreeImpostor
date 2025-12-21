import { useState } from 'react'

function GameSetup({ onStart }) {
  const [numPlayers, setNumPlayers] = useState(4)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (numPlayers >= 3 && numPlayers <= 8) {
      onStart(numPlayers)
    }
  }

  const handleChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 3 && value <= 8) {
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
              Número de jugadores (3-8)
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
                max="8"
                value={numPlayers}
                onChange={handleChange}
                className="player-input"
              />
              <button
                type="button"
                className="btn-increment"
                onClick={() => setNumPlayers(Math.min(8, numPlayers + 1))}
                disabled={numPlayers >= 8}
              >
                +
              </button>
            </div>
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

