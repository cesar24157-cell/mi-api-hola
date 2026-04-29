const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());

// Conexión directa con tu URL de PostgreSQL
const pool = new Pool({
  connectionString: 'postgresql://db_holamundo_5jjo_user:lBZKoCp8h6c6vHnZKsrnKmmbxKgQ0Fxi@dpg-d7l9ntosfn5c73cptsjg-a.oregon-postgres.render.com/db_holamundo_5jjo',
  ssl: { rejectUnauthorized: false }
});

app.get('/', (req, res) => {
    res.send('API Conectada. Ve a /datos');
});

// Ruta que devuelve SOLO el "Hola Mundo:)" de la base de datos
app.get('/datos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT texto FROM mensaje_final LIMIT 1');
        
        if (resultado.rows.length > 0) {
            // Esto envía solo {"texto": "Hola Mundo:)"}
            res.json({
                texto: resultado.rows[0].texto
            });
        } else {
            res.json({ texto: "Tabla vacía" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error de conexión" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor listo`);
});

const cors = require('cors');
const express = require('express');
const app = express();

// Esto le dice a la API: "Acepta peticiones de cualquier sitio"
app.use(cors());