# Asteroids

Clon del clásico arcade **Asteroids** implementado en canvas HTML5 puro, sin dependencias ni bundler.

## Descripción

Nave espacial en un campo de asteroides con envolvimiento de bordes (el espacio es toroidal). Destruye asteroides para sumar puntos: los grandes se parten en medianos, los medianos en pequeños. Incluye power-ups especiales y tipos de asteroides únicos como la estrella fugaz.

## Tecnologías

- **HTML5 Canvas** — renderizado 2D
- **JavaScript (ES6+)** — lógica del juego en un solo archivo `game.js`
- Sin frameworks, sin bundler, sin dependencias

## Cómo correr

Abre `index.html` directamente en el navegador (doble clic), o usa un servidor local:

```bash
npx serve .
```

Luego visita `http://localhost:3000`.

## Controles

| Tecla     | Acción     |
| --------- | ---------- |
| `←` `→`   | Rotar nave |
| `↑`       | Propulsar  |
| `Espacio` | Disparar   |
| `C`       | Cambiar skin de la nave |

## Puntuación

| Asteroide      | Puntos |
| -------------- | ------ |
| Grande         | 20     |
| Mediano        | 50     |
| Pequeño        | 100    |
| Estrella fugaz | 150    |

## Características

- 3 vidas con invencibilidad temporal al reaparecer (parpadeo)
- Asteroides se parten en fragmentos más pequeños al ser destruidos
- **Estrella fugaz**: asteroide especial que cruza el campo mucho más rápido que los normales y desaparece tras unos segundos (parpadea al expirar). Vale 150 puntos y no se parte
- Power-up **Velocidad**: al destruir asteroides puede caer un rombo amarillo que duplica la velocidad de la nave durante 5 segundos
- Power-up **Tiro triple**: rombo celeste que hace que la nave dispare 3 balas en abanico durante 5 segundos
- Power-up **Escudo**: al destruir asteroides también puede caer un hexágono que otorga un escudo de hasta 3 cargas. Al tocar un asteroide con el escudo activo, este lo absorbe y destruye el asteroide en vez de perder una vida
- **Skins de la nave**: pulsa `C` para alternar entre apariencias (Clásica, Neón cian, Dorada, Púrpura). La skin elegida se guarda en `localStorage`, se refleja en los íconos de vida y no afecta la física de la nave
- **Skin Púrpura**: dos veces más grande que la nave original y otorga el doble de puntos por derribo
- Partículas de explosión al destruir asteroides
