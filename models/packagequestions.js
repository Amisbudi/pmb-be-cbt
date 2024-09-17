'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PackageQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PackageQuestions.hasMany(models.Questions, { foreignKey: 'package_question_id' });
      PackageQuestions.hasMany(models.QuestionUsers, { foreignKey: 'package_question_id' });
      PackageQuestions.hasMany(models.Records, { foreignKey: 'package_question_id' });
      PackageQuestions.belongsTo(models.Types, { foreignKey: 'type_id', as: 'type', onDelete: 'RESTRICT', });
      PackageQuestions.hasMany(models.PackageQuestionUsers, { foreignKey: 'package_question_id' });
    }
  }
  PackageQuestions.init({
    type_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PackageQuestions',
  });
  return PackageQuestions;
};