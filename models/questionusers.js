'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuestionUsers.belongsTo(models.Questions, { foreignKey: 'question_id', as: 'question', onDelete: 'RESTRICT', });
      QuestionUsers.belongsTo(models.PackageQuestions, { foreignKey: 'package_question_id', as: 'package', onDelete: 'RESTRICT', });
    }
  }
  QuestionUsers.init({
    number: DataTypes.INTEGER,
    question_id: DataTypes.BIGINT,
    package_question_id: DataTypes.BIGINT,
    user_id: DataTypes.STRING,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    answered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'QuestionUsers',
    tableName: 'cbt_question_users',
    underscored: true,
  });
  return QuestionUsers;
};