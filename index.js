const express = require('express');
const cors = require('cors'); 
const app = express();

// Habilitamos CORS para que tu index.html pueda leer los datos
app.use(cors());

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Servidor arreglado finalmente!');
});

// Ruta de datos para tu fetch
app.get('/datos', (req, res) => {
    res.json({
        texto: "¡Hola! Estos son los datos desde el servidor",
        status: "success"
    });
});

// Configuración del puerto para Render
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});