# AGENTS.md

Vanilla HTML5 Canvas arcade game (Asteroids clone). No frameworks, no bundler, no dependencies.

## Running and verification

- No `package.json`, no build, no tests, no lint. There is **nothing to run to verify**; check changes by opening `index.html` in a browser (double-click) or `npx serve .` → `http://localhost:3000`.
- All game logic lives in `game.js` (~550 lines), loaded from `index.html` as a plain `<script>` — not an ES module, so **no `import`/`export`**. If you need modules, restructuring is required.
- `'use strict'` is set at the top of `game.js`.

## Codebase gotchas

- Canvas is 800x600 hardcoded in **two places** that must stay in sync: the `<canvas width="800" height="600">` attributes in `index.html` and the `W`/`H` constants at the top of `game.js`.
- World is toroidal: `wrap(v, max)` with `W` for x and `H` for y.
- Asteroid sizes are indexed lookup tables `RADII`/`SPEEDS`/`POINTS` by size 3 (big) → 1 (small); index 0 is reserved/unused.
- Game `state` is one of `'playing' | 'dead' | 'gameover'`; `'Space'` restarts on gameover.
- Ship invincibility after respawn is a timer (`this.invincible`), and bullets/asteroids use edge-based `radius` collision via `dist()`.

## Style conventions

- Section comments, README, and in-game UI strings ("NIVEL", "PUNTAJE") are in **Spanish**; code identifiers are English. Keep new comments/UI in Spanish to match.
- Game uses ES6 classes and section divider comments (`// ── Section ───`).
- Power-ups (Velocidad) and the special "estrella fugaz" asteroid (`ShootingStar`) are implemented in `game.js`. The shooting star moves fast, expires on its own `ttl`, scores `STAR_POINTS`, doesn't split, and is flagged with `isShootingStar` so level completion ignores it.