const STORAGE_KEYS = {
  NUM_PLAYERS: 'elImpostor_numPlayers',
  PLAYER_HINTS: 'elImpostor_playerHints'
}

export function saveGamePreferences(numPlayers, playerHints) {
  try {
    localStorage.setItem(STORAGE_KEYS.NUM_PLAYERS, numPlayers.toString())
    localStorage.setItem(STORAGE_KEYS.PLAYER_HINTS, JSON.stringify(playerHints))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export function loadGamePreferences() {
  try {
    const numPlayers = localStorage.getItem(STORAGE_KEYS.NUM_PLAYERS)
    const playerHintsStr = localStorage.getItem(STORAGE_KEYS.PLAYER_HINTS)
    
    let playerHints = null
    if (playerHintsStr) {
      try {
        playerHints = JSON.parse(playerHintsStr)
      } catch (e) {
        playerHints = null
      }
    }
    
    return {
      numPlayers: numPlayers ? parseInt(numPlayers, 10) : null,
      playerHints: playerHints
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return {
      numPlayers: null,
      playerHints: null
    }
  }
}

