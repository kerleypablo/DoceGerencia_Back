const Insumo = require('../models/insumoModel');

// Controlador para listar todos os insumos
async function listarInsumos(req, res) {
  try {
    const insumos = await Insumo.findAll();
    res.json(insumos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar insumos', error: error.message });
  }
}

// Controlador para adicionar um novo insumo
async function adicionarInsumo(req, res) {
  const { nome, quantidade, unidade } = req.body;
  try {
    const novoInsumo = await Insumo.create({ nome, quantidade, unidade });
    res.status(201).json(novoInsumo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar insumo', error: error.message });
  }
}

// Controlador para obter detalhes de um insumo específico
async function obterInsumo(req, res) {
  const id = parseInt(req.params.id);
  try {
    const insumo = await Insumo.findByPk(id);
    if (insumo) {
      res.json(insumo);
    } else {
      res.status(404).json({ message: 'Insumo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter insumo', error: error.message });
  }
}

// Controlador para atualizar um insumo
async function atualizarInsumo(req, res) {
  const id = parseInt(req.params.id);
  const { nome, quantidade, unidade } = req.body;
  try {
    const insumo = await Insumo.findByPk(id);
    if (insumo) {
      await insumo.update({ nome, quantidade, unidade });
      res.json(insumo);
    } else {
      res.status(404).json({ message: 'Insumo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar insumo', error: error.message });
  }
}

// Controlador para excluir um insumo
async function excluirInsumo(req, res) {
  const id = parseInt(req.params.id);
  try {
    const insumo = await Insumo.findByPk(id);
    if (insumo) {
      await insumo.destroy();
      res.json(insumo);
    } else {
      res.status(404).json({ message: 'Insumo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir insumo', error: error.message });
  }
}

module.exports = {
  listarInsumos,
  adicionarInsumo,
  obterInsumo,
  atualizarInsumo,
  excluirInsumo
};
