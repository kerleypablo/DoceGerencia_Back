const { Model, DataTypes } = require('sequelize');
const db = require('../data/database');
const Insumo = require('./insumoModel');

class Receita extends Model {}

Receita.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tempoPreparo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rendimento: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize: db,
    modelName: 'Receita',
    timestamps: false
  }
);

Receita.associate = (models) => {
  Receita.belongsToMany(models.Insumo, {
    through: 'ReceitaInsumo',
    foreignKey: 'receitaId',
    otherKey: 'insumoId',
    as: 'insumos',
    through: {
      model: 'ReceitaInsumo',
      unique: false,
      timestamps: false,
      as: 'quantidade'
    }
  });

  Receita.belongsToMany(models.Produto, {
    through: 'ProdutoReceitas',
    as: 'produtos',
    foreignKey: 'receitaId',
  });
};

module.exports = Receita;
