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
    type_of_question: DataTypes.STRING,
    essay_image: DataTypes.BLOB('medium'),
    essay_image_result: DataTypes.BIGINT,
    created_at: DataTypes.DATE,
    record_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'ViewQuestionUsers',
    tableName: 'resultsquestions',
    timestamps: false,
  });
  return ViewQuestionUsers;
};