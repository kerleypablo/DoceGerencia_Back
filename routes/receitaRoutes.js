const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

// Rota para adicionar uma nova receita
router.post('/', receitaController.adicionarReceita);

// Rota para listar todas as receitas
router.get('/', receitaController.listarReceitas);

// Rota para obter detalhes de uma receita específica
router.get('/:id', receitaController.obterReceita);

// Rota para atualizar uma receita existente
router.put('/:id', receitaController.atualizarReceita);

// Rota para excluir uma receita
router.delete('/:id', receitaController.excluirReceita);

module.exports = router;
