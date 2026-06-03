const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Evita que o app quebre silenciosamente se a conexão ao banco cair enquanto ociosa
pool.on('error', (err) => {
  console.error('Erro inesperado no cliente PostgreSQL (Pool idle):', err);
});

module.exports = pool;
