require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./data/database');
const insumoRoutes = require('./routes/insumoRoutes');

// Configurar middlewares
app.use(express.json());

// Configurar as rotas
app.use('/api/insumos', insumoRoutes);

// Sincronizar o banco de dados e iniciar o servidor
db.sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
