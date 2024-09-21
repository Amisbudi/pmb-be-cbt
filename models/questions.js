'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Questions.hasMany(models.Answers, { foreignKey: 'question_id' });
      Questions.hasMany(models.QuestionUsers, { foreignKey: 'question_id' });
      Questions.hasMany(models.Records, { foreignKey: 'question_id' });
      Questions.belongsTo(models.PackageQuestions, { foreignKey: 'package_question_id', as: 'package', onDelete: 'RESTRICT', });
    }
  }
  Questions.init({
    package_question_id: DataTypes.BIGINT,
    name: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Questions',
    tableName: 'cbt_questions',
    underscored: true,
  });
  return Questions;
};