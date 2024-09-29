'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParticipantGrades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //
    }
  }
  ParticipantGrades.init({
    registration_number: DataTypes.STRING,
    math: DataTypes.DOUBLE,
    physics: DataTypes.DOUBLE,
    bahasa: DataTypes.DOUBLE,
    english: DataTypes.DOUBLE,
    biology: DataTypes.DOUBLE,
    economy: DataTypes.DOUBLE,
    geography: DataTypes.DOUBLE,
    sociological: DataTypes.DOUBLE,
    historical: DataTypes.DOUBLE,
    chemical: DataTypes.DOUBLE,
    general_knowledge: DataTypes.DOUBLE,
    photography_knowledge: DataTypes.DOUBLE,
    tpa: DataTypes.DOUBLE,
    created_by: DataTypes.STRING(30),
    updated_by: DataTypes.STRING(30),
    grade_final: DataTypes.DOUBLE,
    approval_faculty: DataTypes.BOOLEAN,
    approval_faculty_by: DataTypes.STRING,
    approval_faculty_at: DataTypes.DATE,
    approval_university: DataTypes.BOOLEAN,
    approval_university_by: DataTypes.STRING,
    approval_university_at: DataTypes.DATE,
    interview_test: DataTypes.DOUBLE,
    psychological_test: DataTypes.DOUBLE,
    drawing_test: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'ParticipantGrades',
    tableName: 'participant_grades',
    underscored: true,
  });
  return ParticipantGrades;
};