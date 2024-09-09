'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Records.belongsTo(models.Questions, { foreignKey: 'question_id', as: 'question', onDelete: 'RESTRICT', });
      Records.belongsTo(models.PackageQuestions, { foreignKey: 'package_question_id', as: 'package', onDelete: 'RESTRICT', });
      Records.belongsTo(models.Answers, { foreignKey: 'answer_id', as: 'answer', onDelete: 'RESTRICT', });
    }
  }
  Records.init({
    question_user_id: DataTypes.BIGINT,
    question_id: DataTypes.BIGINT,
    package_question_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    answer_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Records',
  });
  return Records;
};