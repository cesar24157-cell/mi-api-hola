const express = require('express');
const cors = require('cors'); // 1. Importamos cors
const app = express();

// 2. Habilitamos CORS para que tu index.html no sea bloqueado
app.use(cors());

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando! Intenta ir a /datos para ver el resto.');
});

app.get('/datos', (req, res) => {
    // 3. Cambié 'mensaje' por 'texto' para que tu HTML lo encuentre
    res.json({
        texto: "¡Hola! Estos son los datos desde el servidor",
        status: "success"
    });
});

// Render usa puertos dinámicos, por eso process.env.PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});