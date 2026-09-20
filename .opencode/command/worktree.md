---
description: Crea un worktree de Git en .worktrees/ con el nombre derivado del argumento.
---

Crea un worktree para la tarea: "$ARGUMENTS"

1. Analiza "$ARGUMENTS". Como puede contener espacios, deriva un nombre de worktree
   en kebab-case según el contexto: minúsculas, espacios → guiones, quita/corrige
   caracteres especiales. Si ya es un identificador limpio, úsalo tal cual.
2. Una vez decidido el nombre, ejecuta en la raíz del repo exactamente:

   git worktree add .worktrees/<nombre-derivado>

3. No hagas nada más: no cambies de directorio, no crees ramas a mano, no registres
   ni modifiques nada. Solo ejecuta el comando de creación del worktree.
4. Reporta unicamente el resultado del comando (stdout/stderr y código de salida).
5. Si los argumentos son muy largos, simplifícalo a un nombre significativo.