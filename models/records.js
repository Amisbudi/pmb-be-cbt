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
      Records.belongsTo(models.GroupQuestion, { foreignKey: 'id_group_questions', as: 'group_questions', onDelete: 'RESTRICT'});
    }
  }
  Records.init({
    question_user_id: DataTypes.BIGINT,
    question_id: DataTypes.BIGINT,
    package_question_id: DataTypes.BIGINT,
    user_id: DataTypes.STRING,
    id_group_questions: { type: DataTypes.BIGINT, allowNull: true },
    answer_id: DataTypes.BIGINT,
    photo: DataTypes.BLOB('medium'),
    essay_image: DataTypes.BLOB('medium'),
    essay_image_result: DataTypes.BIGINT
  },{
    sequelize,
    modelName: 'Records',
    tableName: 'cbt_records',
    underscored: true,
  });
  return Records;
};