'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: 'UserId' });
      
      
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`FirstName is required`
        },
        notEmpty:{
          msg:`FirstName is required`
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`LastName is required`
        },
        notEmpty:{
          msg:`LastName is required`
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Gender is required`
        },
        notEmpty:{
          msg:`Gender is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};