'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('scenarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      heroOne: {
        type: Sequelize.STRING
      },
      heroTwo: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.TEXT
      },
      winner: {
        type: Sequelize.BOOLEAN
      },
      vote: {
        type: Sequelize.INTEGER
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('scenarios');
  }
};