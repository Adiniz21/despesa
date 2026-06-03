const express = require('express');
const pool = require('../config/db');

const router = express.Router();

// Listar contas de um usuário
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `
      SELECT id, nome_banco, saldo, criado_em 
      FROM contas_bancarias 
      WHERE usuario_id = $1 
      ORDER BY criado_em DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    res.status(200).json({ success: true, contas: rows });
  } catch (error) {
    console.error('Erro ao buscar contas:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Criar nova conta bancária
router.post('/', async (req, res) => {
  const { userId, nomeBanco, saldoInicial } = req.body;

  if (!userId || !nomeBanco) {
    return res.status(400).json({ error: 'Dados incompletos.' });
  }

  try {
    const query = `
      INSERT INTO contas_bancarias (usuario_id, nome_banco, saldo)
      VALUES ($1, $2, $3)
      RETURNING id, nome_banco, saldo;
    `;
    const valores = [userId, nomeBanco, saldoInicial || 0.00];
    const { rows } = await pool.query(query, valores);

    res.status(201).json({ success: true, conta: rows[0] });
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

module.exports = router;
