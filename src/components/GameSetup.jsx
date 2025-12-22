import { useState, useEffect } from 'react'
import { loadGamePreferences, saveGamePreferences } from '../utils/localStorage'

function GameSetup({ onStart }) {
  // Cargar preferencias guardadas al montar el componente
  const savedPreferences = loadGamePreferences()
  const [numPlayers, setNumPlayers] = useState(savedPreferences.numPlayers || 4)
  const [hintLevel, setHintLevel] = useState(savedPreferences.hintLevel || 'none')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (numPlayers >= 3 && numPlayers <= 10) {
      // Guardar preferencias en localStorage
      saveGamePreferences(numPlayers, hintLevel)
      onStart(numPlayers, hintLevel)
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
            <label className="label" htmlFor="hint-level">
              Nivel de pista para el impostor
            </label>
            <select
              id="hint-level"
              value={hintLevel}
              onChange={(e) => setHintLevel(e.target.value)}
              className="hint-select"
            >
              <option value="none">Ninguna</option>
              <option value="easy">Fácil</option>
              <option value="hard">Difícil</option>
            </select>
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

