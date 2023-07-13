const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumoContreller');

// Rota para listar todos os insumos
router.get('/', insumoController.listarInsumos);

// Rota para adicionar um novo insumo
router.post('/', insumoController.adicionarInsumo);

// Rota para obter detalhes de um insumo específico
router.get('/:id', insumoController.obterInsumo);

// Rota para atualizar um insumo
router.put('/:id', insumoController.atualizarInsumo);

// Rota para excluir um insumo
router.delete('/:id', insumoController.excluirInsumo);

module.exports = router;
