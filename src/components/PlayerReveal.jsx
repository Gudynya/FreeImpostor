import { useState } from 'react'

function PlayerReveal({ playerNumber, totalPlayers, playerInfo, onNext }) {
  const [revealed, setRevealed] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isUpSwipe = distance > minSwipeDistance
    
    if (isUpSwipe && !revealed) {
      setRevealed(true)
    }
  }

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true)
    }
  }

  const handleNext = () => {
    if (revealed) {
      onNext()
    }
  }

  return (
    <div className="player-reveal">
      <div className="container">
        <div className="player-header">
          <span className="player-counter">
            Jugador {playerNumber} de {totalPlayers}
          </span>
        </div>

        {!revealed ? (
          <div className="reveal-section">
            <div className="reveal-instructions">
              <p>Desliza hacia arriba o presiona el botón para revelar</p>
            </div>
            <button
              className="reveal-button"
              onClick={handleReveal}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <span className="reveal-text">Revelar</span>
              <span className="reveal-hint">↑ Desliza</span>
            </button>
          </div>
        ) : (
          <div className="result-section">
            {playerInfo.isImpostor ? (
              <div className="impostor-result">
                <div className="impostor-icon">🎭</div>
                <h2 className="impostor-title">IMPOSTOR</h2>
                {playerInfo.hint ? (
                  <div className="hint-section">
                    <p className="hint-label">Tu pista:</p>
                    <div className="hint-display">{playerInfo.hint}</div>
                    <p className="impostor-message">
                      ¡Descubre la palabra sin que te atrapen!
                    </p>
                  </div>
                ) : (
                  <p className="impostor-message">
                    No conoces la palabra. ¡Debes descubrirla sin que te atrapen!
                  </p>
                )}
              </div>
            ) : (
              <div className="word-result">
                <div className="word-icon">✅</div>
                <h2 className="word-title">Tu palabra es:</h2>
                <div className="word-display">{playerInfo.word}</div>
                <p className="word-message">
                  Descubre quién es el impostor
                </p>
              </div>
            )}
            
            <button className="btn-next" onClick={handleNext}>
              {playerNumber < totalPlayers ? 'Siguiente Jugador' : 'Finalizar'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerReveal

