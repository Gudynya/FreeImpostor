import { wordsByTheme } from '../data/words'

export function generateGame(numPlayers, theme) {
  // Seleccionar palabra aleatoria del tema
  const words = wordsByTheme[theme]
  if (!words || words.length === 0) {
    throw new Error(`No hay palabras disponibles para el tema: ${theme}`)
  }
  
  const randomIndex = Math.floor(Math.random() * words.length)
  const word = words[randomIndex]
  
  // Seleccionar impostor aleatorio
  const impostorIndex = Math.floor(Math.random() * numPlayers)
  
  // Crear array de jugadores
  const players = []
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      playerNumber: i + 1,
      isImpostor: i === impostorIndex,
      word: i === impostorIndex ? null : word
    })
  }
  
  return {
    theme,
    word,
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

