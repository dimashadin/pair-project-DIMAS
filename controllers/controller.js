let { Post, PostTag, Profile, Tag, User } = require('../models')
var bcrypt = require('bcryptjs');



class Controller {

    static async showHome(req, res) {
        try {
            res.render('GettingStarted')
        } catch (error) {
            res.send(error)
        }
    }
    static async loginForm(req, res) {
        try {

            const { error } = req.query

            res.render('loginForm', { error })

        } catch (error) {
            console.log(error);
            res.send(error)


        }
    }
    static async loginFormPost(req, res) {
        //apakah username dan password yang dimasukan input sudah ada?
        //findOne user dari username
        //kalo user ada check/atau compare password plain dengan password hash (yang sudah di salt)
        //kalo user gada ga boleh masuk home thorow eror
        // kalo gak sama password nya throw eror
        //kalo password sesuai redirec ke home
        try {
            const { username, password } = req.body

            // Cari user berdasarkan username
            const user = await Profile.findOne({ where: { username } });

            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password);


                // Validasi password
                if (isValidPassword) {
                    // Login berhasil
                    req.session.UserId = user.id
                   
                    console.log(`Logged in UserRole: ${req.session.UserRole}`);
                    res.redirect('/post');
                } else {
                    const error = 'Invalid username or password';
                    return res.redirect(`/login?error=${error}`);
                }

            } else {
                const error = 'Invalid username or password';
                return res.redirect(`/login?error=${error}`);
            }
        } catch (error) {

            // console.error(error);
            console.log(error);

            res.send(error)
        }
    }
    static async RegisterForm(req, res) {
        try {

            let { errors } = req.query;
            if (errors) {
                errors = errors.split(',');
            }

            // res.send(errors)
            res.render('registerForm', { errors })

        } catch (error) {
            console.log(error);
            res.send(error)


        }
    }
    static async RegisterFormPost(req, res) {
        try {


            const { username, email, password, role } = req.body
            await Profile.create({ username, email, password, role })

            res.redirect('/login')
        } catch (error) {

            if (error.name === "SequelizeValidationError") {
                res.send(error)
                const erorrs = error.errors.map((el) => el.message)

                res.redirect(`/register?errors=${erorrs}`)
            } else {
                res.send(error)
                console.log(error);

            }




        }
    }

    static async logOut(req, res) {
        try {
            req.session.destroy((el => {
                if (el) {
                    res.send(el)
                } else {
                    res.redirect('/login')
                }
            }))

        } catch (error) {
            res.send(error)
            console.log(error);

        }
        // res.redirect('/login')
    }



    static async showAllPost(req, res) {
        try {
           
            let data = await Profile.findAll({
                include: {
                    model: Post,
                    include: {
                        model: PostTag,
                        include: {
                            model: Tag
                        }
                    }
                }
            })

        

            res.render('Post', { data })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }


    static async addFormPostRead(req,res){
        try {
            
            res.render('addFormPost')
            // console.log('haiiiiiiiiiii');
        } catch (error) {
            res.send(error)
            console.log(error);
            
        }
    }

    static async addFormPost(req,res){
        try {

            const { title, description, imgUrl } = req.body
            await Post.create({ title, description, imgUrl })

            res.redirect('/Post')
            
        } catch (error) {
            res.send(error)
            console.log(error);
            
        }
    }

    static async showTag(req, res) {
        try {
            let { id } = req.params

            let data = await Post.findByPk(id, {
                include: {
                    model: PostTag,
                    include: {
                        model: Post
                    }
                }
            })


            res.render('tag', { data })

            // console.log(data);

            res.send(data)
        } catch (error) {
            res.send(error)
        }
    }


    static async PostTagsShow(req,res){
        try {
            res.render('postTags')
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }



}

module.exports = Controller