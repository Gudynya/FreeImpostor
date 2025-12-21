import { wordsByTheme } from '../data/words'

export function generateGame(numPlayers, theme, enableHints = false) {
  // Seleccionar palabra aleatoria del tema
  const words = wordsByTheme[theme]
  if (!words || words.length === 0) {
    throw new Error(`No hay palabras disponibles para el tema: ${theme}`)
  }
  
  const randomIndex = Math.floor(Math.random() * words.length)
  const selectedWord = words[randomIndex]
  
  // Extraer palabra y pista
  const word = typeof selectedWord === 'string' ? selectedWord : selectedWord.word
  const hint = typeof selectedWord === 'string' ? null : selectedWord.hint
  
  // Seleccionar impostor aleatorio
  const impostorIndex = Math.floor(Math.random() * numPlayers)
  
  // Crear array de jugadores
  const players = []
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      playerNumber: i + 1,
      isImpostor: i === impostorIndex,
      word: i === impostorIndex ? null : word,
      hint: (i === impostorIndex && enableHints) ? hint : null
    })
  }
  
  return {
    theme,
    word,
    hint,
    enableHints,
    impostorIndex,
    players
  }
}

export function getPlayerInfo(gameData, playerIndex) {
  if (!gameData || !gameData.players) {
    return null
  }
  
  return gameData.players[playerIndex] || null
}

