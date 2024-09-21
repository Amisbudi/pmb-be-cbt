'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PackageQuestionUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PackageQuestionUsers.belongsTo(models.PackageQuestions, { foreignKey: 'package_question_id', as: 'package', onDelete: 'RESTRICT', });
    }
  }
  PackageQuestionUsers.init({
    package_question_id: DataTypes.BIGINT,
    user_id: DataTypes.STRING,
    classes: DataTypes.STRING,
    date_exam: DataTypes.DATE,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PackageQuestionUsers',
    tableName: 'cbt_package_question_users',
    underscored: true,
  });
  return PackageQuestionUsers;
};