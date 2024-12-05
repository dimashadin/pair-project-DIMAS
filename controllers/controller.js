let {Post, PostTag, Profile, Tag, User} = require('../models')

class Controller {

    static async showHome(req, res){
        try {
            res.render ('GettingStarted')
        } catch (error) {
            res.send(error)
        }
    }

    static async showAllPost(req, res){
        try {

            // let data = await Post.findAll({
            //     include:{
            //         model: PostTag,
            //         include:{
            //             model:Tag
            //         }
            //     }
            // })

            let data = await Profile.findAll({
                include:{
                    model: Post,
                    include:{
                        model:PostTag,
                        include:{
                            model:Tag
                        }
                    }
                }
            })


            // let profile = await Profile.findAll()
            // res.send(data)
            
            res.render('Post', {data})
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }



}

module.exports = Controller