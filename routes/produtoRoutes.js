const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar todos os produtos
router.get('/', produtoController.listarProdutos);

// Rota para obter os detalhes de um produto específico
router.get('/:id', produtoController.obterProduto);

// Rota para criar um novo produto
router.post('/', produtoController.criarProduto);

// Rota para atualizar um produto existente
router.put('/:id', produtoController.atualizarProduto);

// Rota para excluir um produto
router.delete('/:id', produtoController.excluirProduto);

module.exports = router;
