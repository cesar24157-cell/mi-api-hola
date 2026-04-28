const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // <--- AGREGADO

const app = express();
app.use(cors()); // <--- AGREGADO (Debe ir antes de las rutas)

// Configuración de la conexión a Render Cloud
const pool = new Pool({
  // Tu enlace de Render
  connectionString: 'postgresql://db_holamundo_5jjo_user:lBZKoCp8h6c6vHnZKsrnKmmbxKgQ0Fxi@dpg-d7l9ntosfn5c73cptsjg-a.oregon-postgres.render.com/db_holamundo_5jjo',
  ssl: {
    rejectUnauthorized: false
  }
});

// Ruta para obtener los mensajes de la nueva tabla
app.get('/mensajes-cloud', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM mensajes_cloud');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error conectando al servidor Cloud");
    }
});

// Definir el puerto (importante para Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Cloud corriendo en el puerto ${PORT}`);
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ESTA ES LA PARTE QUE TE FALTA
app.get('/datos', (req, res) => {
    res.send("¡Hola! El servidor ahora sí reconoce esta ruta.");
});

// Ruta principal (opcional, para que no salga error al inicio)
app.get('/', (req, res) => {
    res.send("Servidor funcionando correctamente");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});