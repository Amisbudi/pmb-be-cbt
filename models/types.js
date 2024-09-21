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
    category_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    passing_grade: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Types',
    tableName: 'cbt_types',
    underscored: true,
  });
  return Types;
};