let { Post, PostTag, Profile, Tag, User } = require("../models");

class Controller {
  static async showHome(req, res) {
    try {
      res.render("GettingStarted");
    } catch (error) {
      res.send(error);
    }
  }

  static async showAllPost(req, res) {
    try {
    

      let data = await Post.findAll({
        include: {
          model: Profile
        }
      });


      res.render('Post', {data})
    } catch (error) {
      // console.log(error);
      res.send(error);
    }
  }

  static async showProfile(req, res) {
    try {
      let { id } = req.params;

      let data = await Profile.findByPk(+id, {
        include: {
          model: Post,
          include: {
            model: PostTag,
            include: {
              model: Tag,
            },
          },
        },
      });
      // res.send(data)
      // console.log(data);

      res.render("ProfileById", { data });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showTag(req, res) {
    try {
      let { id } = req.params;

      let data = await Tag.findByPk(+id, {
        include: {
          model: PostTag,
          include: {
            model: Post,
            include: {
              model: Profile,
            },
          },
        },
      });

      // res.send(data)

      res.render("Tag", { data });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async deletePost(req, res) {
    try {
      let { id } = req.params;

      // let data = await Profile.findByPk(+id, {
      //     include:{
      //         model: Post,
      //         include:{
      //             model:PostTag,
      //             include:{
      //                 model:Tag
      //             }
      //         }
      //     }
      // })

      await PostTag.destroy({ where: { PostId: +id } });

      // Hapus Post setelah entri terkait di PostTags dihapus
      await Post.destroy({ where: { id: +id } });

      res.redirect(`/Post`);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }

  static async addForm(req,res){
    try {
        let data = await Post.findAll({
            include:{
                model:Profile
            }
        })
        // res.send(data)
        res.render('formAddPost', {data})
        
    } catch (error) {
        res.send(error)
        // console.log(error);  
    }
  }

  static async postAdd(req,res){
    try {
        // console.log(req.body);

        await Post.create(req.body)

        res.redirect('/Post')
        
        
    } catch (error) {
        res.send(error)
        console.log(error);
        
    }
  }

  static async showEditForm(req,res){
    try {
        let {id} = req.params
        let data = await Post.findByPk(+id, {
            include: {
              model: Profile
            }
          });
        //   res.send(data)
          


        res.render('editForm', {data})
        
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }
  }

  static async postEditForm(req,res){
    try {
        // console.log(req.body);
        
        let {id} = req.params

        
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
  }
}

module.exports = Controller;
