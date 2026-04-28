const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Importamos el conector de Postgres
const app = express();

app.use(cors());

// --- CONFIGURACIÓN DE LA BASE DE DATOS ---
// Sustituye la URL de abajo por tu "External Database URL" que te da Render
const connectionString = 'postgresql://db_holamundo_5jjo_user:lBZKoCp8h6c6vHnZKsrnKmmbxKgQ0Fxi@dpg-d7l9ntosfn5c73cptsjg-a.oregon-postgres.render.com/db_holamundo_5jjo';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Esto es necesario para que Render acepte la conexión
  }
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Servidor conectado a Postgres!');
});

// NUEVA RUTA /DATOS: Ahora trae info de pgAdmin
app.get('/datos', async (req, res) => {
    try {
        // Cambia "tu_tabla" por el nombre de la tabla que creaste en pgAdmin
        const resultado = await pool.query('SELECT * FROM tu_tabla LIMIT 10');
        
        // Enviamos las filas de la tabla al navegador
        res.json({
            texto: "Datos desde pgAdmin:",
            datos: resultado.rows,
            status: "success"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al conectar con la base de datos" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});