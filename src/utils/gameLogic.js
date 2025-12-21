import { wordsByTheme } from '../data/words'

export function generateGame(numPlayers, theme, hintLevel = 'none') {
  // Seleccionar palabra aleatoria del tema
  const words = wordsByTheme[theme]
  if (!words || words.length === 0) {
    throw new Error(`No hay palabras disponibles para el tema: ${theme}`)
  }
  
  const randomIndex = Math.floor(Math.random() * words.length)
  const selectedWord = words[randomIndex]
  
  // Extraer palabra y pista según el nivel
  const word = typeof selectedWord === 'string' ? selectedWord : selectedWord.word
  let hint = null
  
  if (typeof selectedWord !== 'string') {
    if (hintLevel === 'easy' && selectedWord.hintEasy) {
      hint = selectedWord.hintEasy
    } else if (hintLevel === 'hard' && selectedWord.hintHard) {
      hint = selectedWord.hintHard
    }
  }
  
  // Seleccionar impostor aleatorio
  const impostorIndex = Math.floor(Math.random() * numPlayers)
  
  // Crear array de jugadores
  const players = []
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      playerNumber: i + 1,
      isImpostor: i === impostorIndex,
      word: i === impostorIndex ? null : word,
      hint: (i === impostorIndex && hintLevel !== 'none') ? hint : null
    })
  }
  
  return {
    theme,
    word,
    hint,
    hintLevel,
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

