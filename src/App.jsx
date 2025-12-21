import { useState } from 'react'
import GameSetup from './components/GameSetup'
import ThemeSelector from './components/ThemeSelector'
import PlayerReveal from './components/PlayerReveal'
import GameEnd from './components/GameEnd'
import { generateGame } from './utils/gameLogic'

function App() {
  const [gameState, setGameState] = useState('setup') // setup, theme, playing, ended
  const [numPlayers, setNumPlayers] = useState(0)
  const [enableHints, setEnableHints] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [gameData, setGameData] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(0)

  const handleStartGame = (players, hints) => {
    setNumPlayers(players)
    setEnableHints(hints)
    setGameState('theme')
  }

  const handleThemeSelected = (theme) => {
    setSelectedTheme(theme)
    const game = generateGame(numPlayers, theme, enableHints)
    setGameData(game)
    setCurrentPlayer(0)
    setGameState('playing')
  }

  const handleNextPlayer = () => {
    if (currentPlayer < numPlayers - 1) {
      setCurrentPlayer(currentPlayer + 1)
    } else {
      setGameState('ended')
    }
  }

  const handleNewGame = () => {
    setGameState('setup')
    setNumPlayers(0)
    setEnableHints(false)
    setSelectedTheme(null)
    setGameData(null)
    setCurrentPlayer(0)
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

