'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answers.belongsTo(models.Questions, { foreignKey: 'question_id', as: 'question', onDelete: 'RESTRICT', });
      Answers.hasMany(models.Records, { foreignKey: 'answer_id' });
    }
  }
  Answers.init({
    question_id: DataTypes.BIGINT,
    name: DataTypes.TEXT,
    is_right: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Answers',
  });
  return Answers;
};