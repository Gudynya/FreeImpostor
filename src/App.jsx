import { useState } from 'react'
import GameSetup from './components/GameSetup'
import ThemeSelector from './components/ThemeSelector'
import PlayerReveal from './components/PlayerReveal'
import RoundStart from './components/RoundStart'
import GameEnd from './components/GameEnd'
import { generateGame } from './utils/gameLogic'

function App() {
  const [gameState, setGameState] = useState('setup') // setup, theme, playing, roundStart, ended
  const [numPlayers, setNumPlayers] = useState(0)
  const [hintLevel, setHintLevel] = useState('none')
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [gameData, setGameData] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [startingPlayer, setStartingPlayer] = useState(0)

  const handleStartGame = (players, level) => {
    setNumPlayers(players)
    setHintLevel(level)
    setGameState('theme')
  }

  const handleThemeSelected = (theme) => {
    setSelectedTheme(theme)
    const game = generateGame(numPlayers, theme, hintLevel)
    setGameData(game)
    setCurrentPlayer(0)
    setGameState('playing')
  }

  const handleNextPlayer = () => {
    if (currentPlayer < numPlayers - 1) {
      setCurrentPlayer(currentPlayer + 1)
    } else {
      // Seleccionar jugador aleatorio para empezar la ronda
      const randomStartingPlayer = Math.floor(Math.random() * numPlayers) + 1
      setStartingPlayer(randomStartingPlayer)
      setGameState('roundStart')
    }
  }

  const handleContinueToSummary = () => {
    setGameState('ended')
  }

  const handleNewGame = () => {
    setGameState('setup')
    setNumPlayers(0)
    setHintLevel('none')
    setSelectedTheme(null)
    setGameData(null)
    setCurrentPlayer(0)
    setStartingPlayer(0)
  }

  return (
    <div className="app">
      {gameState === 'setup' && (
        <GameSetup onStart={handleStartGame} />
      )}
      {gameState === 'theme' && (
        <ThemeSelector onThemeSelected={handleThemeSelected} />
      )}
      {gameState === 'playing' && gameData && (
        <PlayerReveal
          playerNumber={currentPlayer + 1}
          totalPlayers={numPlayers}
          playerInfo={gameData.players[currentPlayer]}
          onNext={handleNextPlayer}
        />
      )}
      {gameState === 'roundStart' && (
        <RoundStart
          startingPlayer={startingPlayer}
          totalPlayers={numPlayers}
          onContinue={handleContinueToSummary}
        />
      )}
      {gameState === 'ended' && (
        <GameEnd
          gameData={gameData}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  )
}

export default App

