'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile)
      Post.hasMany(models.PostTag)
      
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Title is required`
        },
        notEmpty:{
          msg:`Title is required`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Description is required`
        },
        notEmpty:{
          msg:`Description is required`
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`ImgUrl is required`
        },
        notEmpty:{
          msg:`ImgUrl is required`
        }
      }
    },
    ProfileId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`ProfileId is required`
        },
        notEmpty:{
          msg:`ProfileId is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};