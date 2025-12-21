import { themeNames } from '../data/words'

function GameEnd({ gameData, onNewGame }) {
  if (!gameData) return null

  const impostorPlayer = gameData.players.find(p => p.isImpostor)

  return (
    <div className="game-end">
      <div className="container">
        <h2 className="title">Juego Finalizado</h2>
        
        <div className="game-summary">
          <div className="summary-card">
            <h3>Resumen del Juego</h3>
            <div className="summary-item">
              <span className="summary-label">Tema:</span>
              <span className="summary-value">{themeNames[gameData.theme]}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Palabra:</span>
              <span className="summary-value">{gameData.word}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Impostor:</span>
              <span className="summary-value impostor-badge">
                Jugador {impostorPlayer?.playerNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="end-actions">
          <button className="btn-primary" onClick={onNewGame}>
            Nuevo Juego
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameEnd

