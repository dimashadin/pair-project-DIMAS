'use strict';
const {
  Model,
  Op
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

    static async getAllPost(title, Profile){
      try {
        let options = {
          where: {}, // Default kosong (ambil semua data)
          include: [
            {
              model: Profile, // Sertakan relasi dengan model Profile
            },
          ],
        };
    
        // Jika ada pencarian berdasarkan title
        if (title) {
          options.where.title = {
            [Op.iLike]: `%${title}%`, // Pencarian case-insensitive
          };
        }
    
        // Ambil data dari database
        let data = await Post.findAll(options);
    
        return data;
        
      } catch (error) {
        throw error
      }
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
    },
    likes:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`Likes is required`
        },
        notEmpty:{
          msg:`Likes is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    hooks:{
      beforeValidate :(value)=>{
        value.likes = 0
      }
    }
  });
  return Post;
};