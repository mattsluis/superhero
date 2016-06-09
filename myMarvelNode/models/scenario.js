'use strict';
module.exports = function(sequelize, DataTypes) {
  var scenario = sequelize.define('scenario', {
    userId: DataTypes.INTEGER,
    heroOne: DataTypes.STRING,
    heroTwo: DataTypes.STRING,
    voteCount: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.scenario.belongsTo(models.user);
      }
    }
  });
  return scenario;
};
