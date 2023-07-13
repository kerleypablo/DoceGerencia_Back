const Receita = require('../models/receita');
const Insumo = require('../models/insumo');

async function adicionarReceita(req, res) {
  const { nome, tempoPreparo, rendimento, unidade, observacoes, insumos } = req.body;

  try {
    const novaReceita = await Receita.create({
      nome,
      tempoPreparo,
      rendimento,
      unidade,
      observacoes
    });

    // Adicionar os insumos à receita com a quantidade específica
    for (const insumo of insumos) {
      await novaReceita.addInsumo(insumo.id, {
        through: { quantidade: insumo.quantidade }
      });
    }

    const receitaCompleta = await Receita.findByPk(novaReceita.id, {
      include: [
        {
          model: Insumo,
          as: 'insumos',
          through: { attributes: ['quantidade'] }
        }
      ]
    });

    res.status(201).json(receitaCompleta);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar receita', error: error.message });
  }
}

async function listarReceitas(req, res) {
  try {
    const receitas = await Receita.findAll({
      include: [
        {
          model: Insumo,
          as: 'insumos',
          through: { attributes: ['quantidade'] }
        }
      ]
    });

    res.json(receitas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar receitas', error: error.message });
  }
}

async function obterReceita(req, res) {
  const { id } = req.params;

  try {
    const receita = await Receita.findByPk(id, {
      include: [
        {
          model: Insumo,
          as: 'insumos',
          through: { attributes: ['quantidade'] }
        }
      ]
    });

    if (receita) {
      res.json(receita);
    } else {
      res.status(404).json({ message: 'Receita não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter receita', error: error.message });
  }
}

async function atualizarReceita(req, res) {
  const { id } = req.params;
  const { nome, tempoPreparo, rendimento, unidade, observacoes } = req.body;

  try {
    const receita = await Receita.findByPk(id);

    if (receita) {
      await receita.update({
        nome,
        tempoPreparo,
        rendimento,
        unidade,
        observacoes
      });

      res.json(receita);
    } else {
      res.status(404).json({ message: 'Receita não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar receita', error: error.message });
  }
}

async function excluirReceita(req, res) {
  const { id } = req.params;

  try {
    const receita = await Receita.findByPk(id);

    if (receita) {
      await receita.destroy();
      res.json({ message: 'Receita excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Receita não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir receita', error: error.message });
  }
}

module.exports = {
  adicionarReceita,
  listarReceitas,
  obterReceita,
  atualizarReceita,
  excluirReceita
};
