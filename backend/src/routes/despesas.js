const express = require('express');
const pool = require('../config/db');
const { dbFirestore, admin } = require('../config/firebase');

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, descricao, valor, categoriaId, dataDespesa, contaBancariaId } = req.body;
  
  if (!userId || !valor || !contaBancariaId || !descricao) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  let client;

  try {
    client = await pool.connect();
    await client.query('BEGIN');

    // 1. Desconta o saldo da conta no PostgreSQL
    const updateBankSql = `
      UPDATE contas_bancarias 
      SET saldo = saldo - $1 
      WHERE id = $2 AND usuario_id = $3
      RETURNING id, nome_banco, saldo;
    `;
    const bankResult = await client.query(updateBankSql, [valor, contaBancariaId, userId]);

    if (bankResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Conta não encontrada ou sem permissão.' });
    }

    const { saldo: novoSaldo, nome_banco: bancoUsado } = bankResult.rows[0];

    // 2. Grava a despesa no Firestore
    const despesaFirestore = {
      userId,
      contaBancariaId,
      bancoUsado,
      descricao,
      valor: parseFloat(valor),
      categoriaId,
      data: new Date(dataDespesa),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await dbFirestore.collection('despesas').add(despesaFirestore);

    // 3. Finaliza a transação SQL
    await client.query('COMMIT');
    
    res.status(201).json({ 
      success: true, 
      message: 'Despesa registrada.',
      despesaId: docRef.id,
      novoSaldo
    });

  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Erro na transação Dual-Write:', error);
    res.status(500).json({ error: 'Erro ao registrar despesa.' });
  } finally {
    if (client) {
      client.release();
    }
  }
});

module.exports = router;
