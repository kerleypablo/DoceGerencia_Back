'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      ultimoPreco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Cria a tabela de associação para a lista de receitas
    await queryInterface.createTable('ProdutoReceitas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantidade: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      unidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ProdutoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Produtos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ReceitaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Receitas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Cria a tabela de associação para a lista de decoração
    await queryInterface.createTable('ProdutoDecoracao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantidade: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      unidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ProdutoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Produtos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      InsumoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Insumos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Cria a tabela de associação para a lista de embalagens
    await queryInterface.createTable('ProdutoEmbalagens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantidade: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      unidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ProdutoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Produtos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      InsumoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Insumos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProdutoReceitas');
    await queryInterface.dropTable('ProdutoDecoracao');
    await queryInterface.dropTable('ProdutoEmbalagens');
    await queryInterface.dropTable('Produtos');
  }
};