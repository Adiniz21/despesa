const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contasRoutes = require('./routes/contas');
const despesasRoutes = require('./routes/despesas');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas da aplicação
app.use('/api/contas', contasRoutes);
app.use('/api/despesas', despesasRoutes);

// Rota de Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Online', architecture: 'GCP + Firebase' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
