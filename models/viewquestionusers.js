'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ViewQuestionUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //
    }
  }
  ViewQuestionUsers.init({
    package_question_id: DataTypes.BIGINT,
    package_name: DataTypes.STRING,
    correct_answers: DataTypes.BIGINT,
    incorrect_answers: DataTypes.BIGINT,
    total_questions: DataTypes.BIGINT,
    fullname: DataTypes.STRING,
    user_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ViewQuestionUsers',
    tableName: 'viewquestionusers',
    timestamps: false,
  });
  return ViewQuestionUsers;
};