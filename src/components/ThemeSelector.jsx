import { themeNames } from '../data/words'

function ThemeSelector({ onThemeSelected }) {
  const themes = Object.keys(themeNames)

  return (
    <div className="theme-selector">
      <div className="container">
        <h2 className="title">Selecciona un Tema</h2>
        <p className="subtitle">Elige la categoría de palabras para esta ronda</p>
        
        <div className="themes-grid">
          {themes.map((theme) => (
            <button
              key={theme}
              className="theme-card"
              onClick={() => onThemeSelected(theme)}
            >
              <span className="theme-icon">{getThemeIcon(theme)}</span>
              <span className="theme-name">{themeNames[theme]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function getThemeIcon(theme) {
  const icons = {
    profesiones: '💼',
    cine: '🎬',
    literatura: '📚',
    deportes: '⚽',
    animales: '🐾',
    países: '🌍',
    comida: '🍕',
    tecnología: '💻'
  }
  return icons[theme] || '🎯'
}

export default ThemeSelector

