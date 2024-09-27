'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Types.hasMany(models.PackageQuestions, { foreignKey: 'type_id' });
    }
  }
  Types.init({
    name: DataTypes.STRING,
    active_status: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING(30),
    updated_by: DataTypes.STRING(30),
  }, {
    sequelize,
    modelName: 'Types',
    tableName: 'exam_type',
    underscored: true,
  });
  return Types;
};