import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET /entries → listar todas
app.get('/entries', async (req,res) => {
try {
    const result = await pool.query(
        'SELECT id, texto, fecha FROM entries ORDER BY fecha DESC'
    );
    res.json(result.rows);
}   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener entradas' });
} 
});

// POST/ entries → crear nueva
app.post('/entries', async (req, res) => {
const { texto } = req.body;

if (!texto || texto.trim() === '') {
    return res.status(400).json({ error: 'El texto es obligatorio' });
}

try {
    const result = await pool.query(
        'INSERT INTO entries (texto) VALUES ($1) RETURNING id, texto, fecha',
        [texto.trim()]
    );
    res.status(201).json(result.rows[0]);
}   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear entrada'});
}
});

// DELETE /entries/:id → borrar
app.delete('/entries/:id', async (req, res) => {
const { id } = req.params;

try {
    const result = await pool.query(
        'DELETE FROM entries WHERE id = $1 RETURNING id',
        [id]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Entrada no encontrada' });
    }

    res.json({ message: 'Entrada eliminada' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar entrada' });
}
});

app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});