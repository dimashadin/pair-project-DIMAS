'use strict';
const {
  Model
} = require('sequelize');
var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Profile.hasMany(models.Post)
    }

    
  }
  Profile.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Username is required`
        },
        notEmpty:{
          msg:`Username is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Email is required`
        },
        notEmpty:{
          msg:`Email is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Password is required`
        },
        notEmpty:{
          msg:`Password is required`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Role is required`
        },
        notEmpty:{
          msg:`Role is required`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references:{
        model:"Users",
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
    hooks:{
      beforeCreate(instance,options){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password= hash

        
      }
    },


    
  });
  return Profile;
};