'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    scenarioId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.comment.belongsTo(models.user);
        models.comment.belongsTo(models.scenario);


      }
    }
  });
  return comment;
};
