import { wordsByTheme } from '../data/words'

export function generateGame(numPlayers, theme, playerHints = []) {
  // Seleccionar palabra aleatoria del tema
  const words = wordsByTheme[theme]
  if (!words || words.length === 0) {
    throw new Error(`No hay palabras disponibles para el tema: ${theme}`)
  }
  
  const randomIndex = Math.floor(Math.random() * words.length)
  const selectedWord = words[randomIndex]
  
  // Extraer palabra
  const word = typeof selectedWord === 'string' ? selectedWord : selectedWord.word
  
  // Seleccionar impostor aleatorio
  const impostorIndex = Math.floor(Math.random() * numPlayers)
  
  // Obtener nivel de pista del impostor
  const impostorHintLevel = playerHints[impostorIndex] || 'none'
  
  // Extraer pista según el nivel del impostor
  let hint = null
  if (typeof selectedWord !== 'string' && impostorHintLevel !== 'none') {
    if (impostorHintLevel === 'easy' && selectedWord.hintEasy) {
      hint = selectedWord.hintEasy
    } else if (impostorHintLevel === 'hard' && selectedWord.hintHard) {
      hint = selectedWord.hintHard
    }
  }
  
  // Crear array de jugadores
  const players = []
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      playerNumber: i + 1,
      isImpostor: i === impostorIndex,
      word: i === impostorIndex ? null : word,
      hint: (i === impostorIndex && hint) ? hint : null
    })
  }
  
  return {
    theme,
    word,
    hint,
    playerHints,
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

