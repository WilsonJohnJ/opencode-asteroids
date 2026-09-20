'use strict';

// ── Sistema de skins de la nave ──────────────────────────────────────────────
// Cada skin define:
//   id, name, color — metadatos y color de referencia (íconos de vida)
//   draw(ctx, ship)  — dibuja el cuerpo y la llama; ctx viene trasladado a
//                      (ship.x, ship.y) y rotado a ship.angle
//   drawIcon(ctx)    — dibuja una versión pequeña para el HUD (opcional;
//                      por defecto se usa la silueta clásica con `color`)
//   scale (opcional, por defecto 1)           — multiplicador de tamaño de la
//                      nave (dibujo, hitbox y punto de disparo)
//   pointsMultiplier (opcional, por defecto 1) — multiplicador de puntos
//
// La skin no altera la física más allá del `scale` de su hitbox.

const SKINS = [
  {
    id: 'clasica',
    name: 'Clásica',
    color: '#fff',

    draw(ctx, ship) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth   = 1.5;
      ctx.lineJoin    = 'round';

      // Silueta clásica: triángulo con muesca trasera
      ctx.beginPath();
      ctx.moveTo( 20,  0);   // nariz
      ctx.lineTo(-12, -9);   // ala izquierda
      ctx.lineTo( -7,  0);   // muesca trasera
      ctx.lineTo(-12,  9);   // ala derecha
      ctx.closePath();
      ctx.stroke();

      // Llama del propulsor
      if (ship.thrusting && Math.random() > 0.35) {
        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(-8 - (6 + Math.random() * 8), 0);
        ctx.lineTo(-8,  4);
        ctx.strokeStyle = 'rgba(255, 130, 0, 0.85)';
        ctx.stroke();
      }
    },
  },
  {
    id: 'neon',
    name: 'Neón cian',
    color: '#5ff7ff',

    draw(ctx, ship) {
      // Resplandor neón
      ctx.shadowColor = 'rgba(0, 255, 220, 0.9)';
      ctx.shadowBlur  = 12;
      ctx.strokeStyle = '#5ff7ff';
      ctx.lineWidth   = 2;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';

      // Silueta más alargada y afilada
      ctx.beginPath();
      ctx.moveTo( 23,  0);   // nariz
      ctx.lineTo(  4, -4);
      ctx.lineTo(-12, -8);   // ala izquierda
      ctx.lineTo( -6,  0);   // muesca trasera
      ctx.lineTo(-12,  8);   // ala derecha
      ctx.lineTo(  4,  4);
      ctx.closePath();
      ctx.stroke();

      // Chimenea interna leve para dar profundidad
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(160, 255, 240, 0.35)';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(-7, 0);
      ctx.stroke();

      // Llama del propulsor
      if (ship.thrusting && Math.random() > 0.35) {
        ctx.beginPath();
        ctx.moveTo(-7, -4);
        ctx.lineTo(-7 - (7 + Math.random() * 9), 0);
        ctx.lineTo(-7,  4);
        ctx.strokeStyle = 'rgba(0, 255, 220, 0.9)';
        ctx.stroke();
      }
    },
  },
  {
    id: 'dorada',
    name: 'Dorada',
    color: '#ffc93c',

    draw(ctx, ship) {
      ctx.strokeStyle = '#ffc93c';
      ctx.lineWidth   = 2;
      ctx.lineJoin    = 'round';

      // Silueta clásica con relleno dorado tenue
      ctx.fillStyle = 'rgba(255, 201, 60, 0.12)';
      ctx.beginPath();
      ctx.moveTo( 20,  0);   // nariz
      ctx.lineTo(-12, -9);   // ala izquierda
      ctx.lineTo( -7,  0);   // muesca trasera
      ctx.lineTo(-12,  9);   // ala derecha
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Detalle gemelo en la nariz
      ctx.fillStyle = '#ffd23f';
      ctx.beginPath();
      ctx.arc(10, 0, 2, 0, Math.PI * 2);
      ctx.fill();

      // Llama del propulsor
      if (ship.thrusting && Math.random() > 0.35) {
        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(-8 - (7 + Math.random() * 9), 0);
        ctx.lineTo(-8,  4);
        ctx.strokeStyle = 'rgba(255, 190, 40, 0.9)';
        ctx.stroke();
      }
    },
  },
  {
    id: 'morada',
    name: 'Púrpura',
    color: '#b54bff',
    scale: 2,             // dos veces más grande que la nave original
    pointsMultiplier: 2,  // el jugador recibe el doble de puntos

    draw(ctx, ship) {
      ctx.save();

      // Nave dos veces más grande que el resto de skins
      ctx.scale(this.scale, this.scale);

      ctx.strokeStyle = '#b54bff';
      ctx.fillStyle   = 'rgba(181, 75, 255, 0.15)';
      ctx.lineWidth   = 1.5;
      ctx.lineJoin    = 'round';

      // Silueta clásica (se agranda con el scale)
      ctx.beginPath();
      ctx.moveTo( 20,  0);   // nariz
      ctx.lineTo(-12, -9);   // ala izquierda
      ctx.lineTo( -7,  0);   // muesca trasera
      ctx.lineTo(-12,  9);   // ala derecha
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cabina morada más clara
      ctx.fillStyle = 'rgba(200, 130, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(7, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Llama del propulsor
      if (ship.thrusting && Math.random() > 0.35) {
        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(-8 - (6 + Math.random() * 8), 0);
        ctx.lineTo(-8,  4);
        ctx.strokeStyle = 'rgba(180, 80, 255, 0.85)';
        ctx.stroke();
      }

      ctx.restore();
    },
  },
];

// ── Selección y persistencia ─────────────────────────────────────────────────
const SKIN_STORAGE_KEY = 'asteroids-skin';

function loadSkin() {
  const id = localStorage.getItem(SKIN_STORAGE_KEY);
  return SKINS.find(s => s.id === id) || SKINS[0];
}

function cycleSkin(current) {
  const idx = SKINS.findIndex(s => s.id === current.id);
  return SKINS[(idx + 1) % SKINS.length];
}