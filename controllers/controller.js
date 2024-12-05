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

            // res.send(data)
            
            res.render('Post', {data})
            
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    }

    static async showProfile(req,res){
        try {
            let {id} = req.params

            let data = await Profile.findByPk(+id, {
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
            // res.send(data)
            // console.log(data);
            
            

            res.render('ProfileById', {data})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }


}

module.exports = Controller