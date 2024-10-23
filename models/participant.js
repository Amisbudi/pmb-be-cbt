'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Participant.hasMany(models.PackageQuestionUsers, { 
        foreignKey: 'user_id', 
        sourceKey: 'identify_number'
      });
    }
  }
  Participant.init({
    identify_number: DataTypes.STRING,
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Participant',
    tableName: 'participants',
    underscored: true,
  });
  return Participant;
};