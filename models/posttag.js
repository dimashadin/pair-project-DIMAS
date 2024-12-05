'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostTag.belongsTo(models.Post)
      PostTag.belongsTo(models.Tag)
    }
  }
  PostTag.init({
    PostId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`PostId is required`
        },
        notEmpty:{
          msg:`PostId is required`
        }
      }
    },
    TagId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`TagId is required`
        },
        notEmpty:{
          msg:`TagId is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};