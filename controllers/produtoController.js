const Produto = require('../models/produtoModel');

// Controlador para listar todos os produtos
async function listarProdutos(req, res) {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar os produtos:', error);
    res.status(500).json({ message: 'Erro ao listar os produtos' });
  }
}

// Controlador para obter detalhes de um produto específico
async function obterProduto(req, res) {
  const id = req.params.id;

  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter o produto:', error);
    res.status(500).json({ message: 'Erro ao obter o produto' });
  }
}

// Controlador para cadastrar um novo produto
async function cadastrarProduto(req, res) {
  const { nome, categoria, preco, ultimoPreco, foto, receitas, decoracao, embalagens } = req.body;

  try {
    // Cria o produto no banco de dados
    const produto = await Produto.create({
      nome,
      categoria,
      preco,
      ultimoPreco,
      foto,
    });

    // Associa as receitas ao produto
    if (receitas && receitas.length > 0) {
      await produto.setReceitas(receitas, { through: { quantidade: 1, unidade: 'unidade' } });
    }

    // Associa a decoração ao produto
    if (decoracao && decoracao.length > 0) {
      await produto.setDecoracao(decoracao, { through: { quantidade: 1, unidade: 'unidade' } });
    }

    // Associa as embalagens ao produto
    if (embalagens && embalagens.length > 0) {
      await produto.setEmbalagens(embalagens, { through: { quantidade: 1, unidade: 'unidade' } });
    }

    res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao cadastrar o produto:', error);
    res.status(500).json({ message: 'Erro ao cadastrar o produto' });
  }
}

// Controlador para atualizar um produto
async function atualizarProduto(req, res) {
  const id = req.params.id;
  const { nome, categoria, preco, ultimoPreco, foto, receitas, decoracao, embalagens } = req.body;

  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      await produto.update({
        nome,
        categoria,
        preco,
        ultimoPreco,
        foto,
      });

      // Atualiza as receitas do produto
      if (receitas && receitas.length > 0) {
        await produto.setReceitas(receitas, { through: { quantidade: 1, unidade: 'unidade' } });
      } else {
        await produto.setReceitas([]);
      }

      // Atualiza a decoração do produto
      if (decoracao && decoracao.length > 0) {
        await produto.setDecoracao(decoracao, { through: { quantidade: 1, unidade: 'unidade' } });
      } else {
        await produto.setDecoracao([]);
      }

      // Atualiza as embalagens do produto
      if (embalagens && embalagens.length > 0) {
        await produto.setEmbalagens(embalagens, { through: { quantidade: 1, unidade: 'unidade' } });
      } else {
        await produto.setEmbalagens([]);
      }

      res.json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
    res.status(500).json({ message: 'Erro ao atualizar o produto' });
  }
}

// Controlador para excluir um produto
async function excluirProduto(req, res) {
  const id = req.params.id;

  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      await produto.destroy();
      res.json({ message: 'Produto excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir o produto:', error);
    res.status(500).json({ message: 'Erro ao excluir o produto' });
  }
}

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
