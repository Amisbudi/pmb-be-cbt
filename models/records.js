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
      // define association here
    }
  }
  Records.init({
    question_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    answer_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Records',
  });
  return Records;
};