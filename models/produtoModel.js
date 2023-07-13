const { Model, DataTypes } = require('sequelize');
const db = require('../data/database');

class Produto extends Model {}

Produto.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ultimoPreco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: db,
  modelName: 'Produto',
});


Produto.associate = (models) => {
    Produto.belongsToMany(models.Receita, {
      through: 'ProdutoReceitas',
      as: 'receitas',
      foreignKey: 'produtoId',
    });
  
    Produto.belongsToMany(models.Insumo, {
        through: 'ProdutoDecoracao',
        as: 'decoracao',
        foreignKey: 'produtoId',
        otherKey: 'insumoId',
        // Definir as colunas adicionais na tabela de associação
        // para armazenar a quantidade e a unidade
        timestamps: false,
        additionalAttributes: {
          quantidade: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
          },
          unidade: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },
      });
    
      Produto.belongsToMany(models.Insumo, {
        through: 'ProdutoEmbalagens',
        as: 'embalagens',
        foreignKey: 'produtoId',
        otherKey: 'insumoId',
        // Definir as colunas adicionais na tabela de associação
        // para armazenar a quantidade e a unidade
        timestamps: false,
        additionalAttributes: {
          quantidade: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
          },
          unidade: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },
      });
    };
  
    Produto.belongsToMany(models.Insumo, {
      through: 'ProdutoEmbalagens',
      as: 'embalagens',
      foreignKey: 'produtoId',
      otherKey: 'insumoId',
      // Definir as colunas adicionais na tabela de associação
      // para armazenar a quantidade e a unidade
      timestamps: false,
      additionalAttributes: {
        quantidade: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        unidade: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
    });

module.exports = Produto;
