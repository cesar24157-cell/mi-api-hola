const express = require('express');
const app = express();

// Esto arregla el error "Cannot GET /"
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando! Intenta ir a /datos para ver el resto.');
});

// Esto arregla el error "Cannot GET /datos"
app.get('/datos', (req, res) => {
    res.json({
        mensaje: "Estos son tus datos",
        status: "success"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});