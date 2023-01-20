'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
    
      email: {
        type: Sequelize.STRING,

        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,

        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,

        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
