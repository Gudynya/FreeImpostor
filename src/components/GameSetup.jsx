import { useState, useEffect } from 'react'
import { loadGamePreferences, saveGamePreferences } from '../utils/localStorage'

function GameSetup({ onStart }) {
  // Cargar preferencias guardadas al montar el componente
  const savedPreferences = loadGamePreferences()
  const [numPlayers, setNumPlayers] = useState(savedPreferences.numPlayers || 4)
  const [playerHints, setPlayerHints] = useState(() => {
    // Inicializar con preferencias guardadas o valores por defecto
    if (savedPreferences.playerHints && savedPreferences.playerHints.length === (savedPreferences.numPlayers || 4)) {
      return savedPreferences.playerHints
    }
    // Crear array con valores por defecto
    const defaultHints = []
    for (let i = 0; i < (savedPreferences.numPlayers || 4); i++) {
      defaultHints.push('none')
    }
    return defaultHints
  })

  // Actualizar playerHints cuando cambia numPlayers
  useEffect(() => {
    if (numPlayers !== playerHints.length) {
      const newHints = []
      for (let i = 0; i < numPlayers; i++) {
        newHints.push(playerHints[i] || 'none')
      }
      setPlayerHints(newHints.slice(0, numPlayers))
    }
  }, [numPlayers])

  const handleNumPlayersChange = (value) => {
    if (value >= 3 && value <= 10) {
      setNumPlayers(value)
      // Ajustar array de hints
      const newHints = [...playerHints]
      if (value > playerHints.length) {
        // Añadir nuevos jugadores con 'none'
        for (let i = playerHints.length; i < value; i++) {
          newHints.push('none')
        }
      } else {
        // Reducir array
        newHints.splice(value)
      }
      setPlayerHints(newHints)
    }
  }

  const handlePlayerHintChange = (playerIndex, hintLevel) => {
    const newHints = [...playerHints]
    newHints[playerIndex] = hintLevel
    setPlayerHints(newHints)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (numPlayers >= 3 && numPlayers <= 10) {
      // Guardar preferencias en localStorage
      saveGamePreferences(numPlayers, playerHints)
      onStart(numPlayers, playerHints)
    }
  }

  const handleChange = (e) => {
    const value = parseInt(e.target.value)
    handleNumPlayersChange(value)
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
                onClick={() => handleNumPlayersChange(Math.max(3, numPlayers - 1))}
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
                onClick={() => handleNumPlayersChange(Math.min(10, numPlayers + 1))}
                disabled={numPlayers >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="player-hints-config">
            <h3 className="player-hints-title">Configurar pistas por jugador</h3>
            <p className="player-hints-subtitle">Define si cada jugador recibirá pista si es el impostor</p>
            <div className="player-hints-list">
              {playerHints.map((hintLevel, index) => (
                <div key={index} className="player-hint-item">
                  <span className="player-hint-label">Jugador {index + 1}:</span>
                  <select
                    value={hintLevel}
                    onChange={(e) => handlePlayerHintChange(index, e.target.value)}
                    className="hint-select-small"
                  >
                    <option value="none">Ninguna</option>
                    <option value="easy">Fácil</option>
                    <option value="hard">Difícil</option>
                  </select>
                </div>
              ))}
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

