
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());

// Configuración de la base de datos
const pool = new Pool({
  connectionString: 'postgresql://db_holamundo_5jjo_user:lBZKoCp8h6c6vHnZKsrnKmmbxKgQ0Fxi@dpg-d7l9ntosfn5c73cptsjg-a.oregon-postgres.render.com/db_holamundo_5jjo',
  ssl: { rejectUnauthorized: false }
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando. Ve a /datos para ver pgAdmin.');
});

// Esta ruta ahora consulta tu tabla "mensaje_final"
app.get('/datos', async (req, res) => {
    try {
        // Consultamos la tabla que vi en tu captura de pgAdmin
        const resultado = await pool.query('SELECT texto FROM mensaje_final');
        
        // Si hay datos, mandamos el primero. Si no, un mensaje de error.
        if (resultado.rows.length > 0) {
            res.json({
                texto: resultado.rows[0].texto, // Esto mostrará "Hola Mundo:)"
                status: "success"
            });
        } else {
            res.json({ texto: "No hay datos en la tabla todavía", status: "empty" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al leer pgAdmin" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});