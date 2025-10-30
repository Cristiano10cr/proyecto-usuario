# Instrucciones rápidas para agentes (Copilot / IA)

Este proyecto es mínimo y contiene un backend en Node.js (carpeta `backend/`) y un `package.json` con dependencias. Usa estas instrucciones para ser inmediatamente productivo con tareas de código, pruebas y cambios de arquitectura.

Resumen rápido
- Estructura actual: `package.json` en la raíz y una carpeta `backend/` (vacía en esta instantánea).
- Dependencias detectadas en `package.json`: `express`, `mysql2`, `dotenv`, `cors`. DevDependency: `nodemon`.

Contrato pequeño (qué hará tu cambio)
- Entrada: editar/añadir JS/TS dentro de `backend/`.
- Salida: servidor Express que lee configuración desde variables de entorno (dotenv) y se conecta a MySQL con `mysql2`.
- Errores: si faltan archivos de entrada (p. ej. `backend/index.js`) o `.env`, notifica y sugiere nombres/valores razonables.

Puntos clave que debes comprobar antes de modificar o generar código
- Busca un punto de entrada obvio en `backend/` (p. ej. `index.js`, `app.js`, `server.js`). Si no existe, propon un esqueleto y comenta los supuestos.
- Variables de entorno: el proyecto usa `dotenv` — busca un archivo `.env` o referencias a `process.env` para nombres (DB_HOST, DB_USER, DB_PASS, PORT, etc.). Si no existen, sugiere nombres estándar y documenta que son supuestos.
- Conexión a base de datos: usa `mysql2` — busca sitios donde se crea `mysql.createPool` o `createConnection`. Si no existe, genera un ejemplo minimal y seguro (pool con `waitForConnections`, manejo de errores básico).

Comandos y flujos de desarrollo (inferencia basada en dependencias)
- Instalar dependencias: `npm install` (raíz del repo).
- Ejecutar en desarrollo (si el usuario añade un entrypoint): sugiere `npx nodemon backend/index.js` o añadir un script `dev` en `package.json` como `nodemon backend/index.js`.
- Ejecutar en producción: `node backend/index.js` (asume que el archivo existe).

Patrones y convenciones a seguir en este repo
- Organización: poner el servidor y rutas bajo `backend/`, por ejemplo `backend/index.js`, `backend/routes/`, `backend/controllers/`, `backend/db/`.
- Config: centralizar lectura de variables de entorno en `backend/config.js` y exportar un objeto `config` usado por el resto.
- Database: poner la lógica de conexión en `backend/db/pool.js` y exportar la instancia del pool.
- Errores: devolver JSON con `{ error: 'mensaje' }` y usar códigos HTTP adecuados.

Ejemplos concretos (fragmentos breves que pueden ser usados o adaptados)
- Conexión DB (ejemplo mínimo para `backend/db/pool.js`):
  - usa `mysql2/promise` para un API basada en promesas.

- Archivo de arranque (ejemplo `backend/index.js`): crea una app Express, carga `dotenv`, monta rutas y escucha en `process.env.PORT || 3000`.

Cuando debas modificar/añadir código, sigue este checklist rápido
1. Confirmar si hay un punto de entrada en `backend/`. Si no existe, proponlo antes de añadir mucho código.
2. Añadir/usar `dotenv` para variables sensibles (no crear `.env` con credenciales reales — pedir valores de ejemplo al usuario).
3. Colocar la lógica de BD en `backend/db/`, rutas en `backend/routes/`, y controladores en `backend/controllers/`.
4. Añadir un script `dev` en `package.json` si propones usar `nodemon`.

Notas sobre supuestos y pasos pendientes
- Supuesto 1: No hay entrypoint detectado en `backend/`. Antes de generar grandes cambios, pregunta al mantenedor si existe una convención preferida (p. ej. TypeScript, estructura monorepo, Docker).
- Supuesto 2: No hay `.env` ni scripts en `package.json`. He incluido comandos sugeridos arriba; confirma si quieres que añada scripts automáticos en `package.json`.

Referencias rápidas en este repo
- `package.json` — dependencias instaladas (express, mysql2, dotenv, cors, nodemon).
- `backend/` — carpeta principal del servidor (actualmente vacía en la instantánea).

Si algo no es claro, pregunta: ¿qué punto de entrada esperas para el backend? ¿Quieres que genere un esqueleto completo (`index.js`, `db/pool.js`, `routes/example.js`) ahora?

---
Pequeña nota final: este archivo fue generado/actualizado automáticamente tras inspeccionar `package.json` y la estructura presente. Manténlo breve y edítalo si el proyecto tiene convenciones internas no detectables por análisis estático.
