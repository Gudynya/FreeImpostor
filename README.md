# El Impostor - PWA

Aplicación PWA para jugar al juego "El Impostor" donde 3-8 jugadores juegan localmente en el mismo dispositivo.

## 🎮 Cómo Jugar

1. Selecciona el número de jugadores (3-8)
2. Elige un tema de palabras
3. Cada jugador pasa el dispositivo y revela su palabra
4. El impostor no conoce la palabra y debe descubrirla sin ser detectado

## 🚀 Instalación

```bash
npm install
```

## 📱 Desarrollo

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📦 Características PWA

- Instalable en dispositivos móviles
- Funciona offline
- Diseño responsive
- Interfaz moderna y animada

## 🎯 Temas Disponibles

- Profesiones
- Cine
- Literatura
- Deportes
- Animales
- Países
- Comida
- Tecnología

## 📝 Notas

### Iconos PWA

Para una mejor experiencia PWA, se recomienda agregar iconos PNG en `public/`:
- `pwa-192x192.png` (192x192px)
- `pwa-512x512.png` (512x512px)

Luego actualiza `vite.config.js` para usar estos iconos. Por ahora, la aplicación usa un SVG como placeholder.

### Generar Iconos

Puedes usar herramientas online como:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

O crear los iconos manualmente con un editor de imágenes.

