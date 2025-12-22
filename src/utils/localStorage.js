const STORAGE_KEYS = {
  NUM_PLAYERS: 'elImpostor_numPlayers',
  HINT_LEVEL: 'elImpostor_hintLevel'
}

export function saveGamePreferences(numPlayers, hintLevel) {
  try {
    localStorage.setItem(STORAGE_KEYS.NUM_PLAYERS, numPlayers.toString())
    localStorage.setItem(STORAGE_KEYS.HINT_LEVEL, hintLevel)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export function loadGamePreferences() {
  try {
    const numPlayers = localStorage.getItem(STORAGE_KEYS.NUM_PLAYERS)
    const hintLevel = localStorage.getItem(STORAGE_KEYS.HINT_LEVEL)
    
    return {
      numPlayers: numPlayers ? parseInt(numPlayers, 10) : null,
      hintLevel: hintLevel || null
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return {
      numPlayers: null,
      hintLevel: null
    }
  }
}

