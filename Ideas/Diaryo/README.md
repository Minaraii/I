# Diaryo

Diario virtual minimalista.  
Escribe. Guarda. Recuerda.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- API: REST

## Estructura

Diaryo/
├── backend/
│   ├── .env
│   ├── db.js
│   ├── package.json
│   └── server.js
└── frontend/

## Requisitos

- Node.js (LTS)
- PostgreSQL

## Base de datos

```sql
CREATE USER diario WITH PASSWORD 'diario123';
CREATE DATABASE diario OWNER diario;
GRANT ALL PRIVILEGES ON DATABASE diario TO diario;

CREATE TABLE entries (
  id    SERIAL PRIMARY KEY,
  texto TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT NOW()
);
Backend
.env
textPORT=3000
DATABASE_URL=postgresql://diario:diario123@localhost:5432/diario
Instalar y correr
Bashcd backend
npm install
npm run dev
Servidor en: http://localhost:3000
API

Diaryo — menos es más.























MétodoRutaDescripciónGET/entriesListar entradasPOST/entriesCrear entradaDELETE/entries/:idEliminar entrada
Ejemplos
Bash# Listar
curl http://localhost:3000/entries

# Crear
curl -X POST http://localhost:3000/entries \
  -H "Content-Type: application/json" \
  -d '{"texto": "Hoy fue un buen día"}'

# Eliminar
curl -X DELETE http://localhost:3000/entries/1
Estado

Backend → Completo
Frontend → Pendiente
