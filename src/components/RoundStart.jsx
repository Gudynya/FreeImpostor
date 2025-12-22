function RoundStart({ startingPlayer, totalPlayers, onContinue }) {
  return (
    <div className="round-start">
      <div className="container">
        <h2 className="title">¡Comienza la Ronda!</h2>
        
        <div className="starting-player-card">
          <div className="player-number-display">
            <span className="player-number-label">Jugador</span>
            <span className="player-number-value">{startingPlayer}</span>
          </div>
          <p className="starting-message">
            Serás el primero en hablar. ¡Buena suerte!
          </p>
        </div>

        <div className="round-actions">
          <button className="btn-primary" onClick={onContinue}>
            Ver Resumen
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoundStart

