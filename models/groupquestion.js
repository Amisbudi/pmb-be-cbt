'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupQuestion extends Model {
    static associate(models) {
      GroupQuestion.belongsTo(models.PackageQuestions, { foreignKey: 'package_question_id', as: 'package_questions' });
    }
  }
  GroupQuestion.init({
    package_question_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    naration: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'GroupQuestion',
    tableName: 'cbt_group_questions',
    underscored: true,
  });
  return GroupQuestion;
};