const { Model, DataTypes } = require('sequelize');
const db = require('../data/database');
const Receita = require('./receitaModel');

class Insumo extends Model {}

Insumo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    unidade: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fornecedor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Insumo'
  }
);

Insumo.associate = (models) => {
  Insumo.belongsToMany(models.Produto, {
    through: 'ProdutoDecoracao',
    as: 'decoracao',
    foreignKey: 'insumoId',
  });

  Insumo.belongsToMany(models.Produto, {
    through: 'ProdutoEmbalagens',
    as: 'embalagens',
    foreignKey: 'insumoId',
  });

  Insumo.belongsToMany(models.Receita, {
    through: 'ReceitaInsumo',
    as: 'receitas',
    foreignKey: 'insumoId',
  });
}

module.exports = Insumo;
