'use strict';
module.exports = function(sequelize, DataTypes) {
  var scenario = sequelize.define('scenario', {
    userId: DataTypes.INTEGER,
    heroOne: DataTypes.STRING,
    heroTwo: DataTypes.STRING,
    comment: DataTypes.TEXT,
    winner: DataTypes.BOOLEAN,
    vote: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.scenario.belongsTo(models.user);
        models.scenario.hasMany(models.comment);
      }
    }
  });
  return scenario;
};
