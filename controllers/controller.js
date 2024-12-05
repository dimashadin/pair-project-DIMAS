let { Post, PostTag, Profile, Tag, User } = require('../models')
var bcrypt = require('bcryptjs');
let {formatDate} = require('../helper/dateHelper')
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

            res.send(error)


        }
    }
    static async loginFormPost(req, res) {

        try {
            const { username, password } = req.body
            const user = await Profile.findOne({ where: { username } });

            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if (isValidPassword) {
                    req.session.UserId = user.id
                    req.session.UserRole = user.role;

                    // console.log(`Logged in UserRole: ${req.session.UserRole}`);
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
            res.send(error)
        }
    }



    static async RegisterForm(req, res) {
        try {

            let { errors } = req.query

            if (errors) {
                errors = errors.split(',');
            }

          
            res.render('registerForm', { errors })

        } catch (error) {
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
            }
        }
    }

    static async logOut(req, res) {
        try {
            req.session.destroy((el => {
                if (el) {
                    res.send(el)
                } else {
                    res.redirect('/')
                }
            }))

        } catch (error) {
            res.send(error)
        }
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


            //menggunakan helper date
            data.forEach(user => {
                user.Posts.forEach(post => {
                    post.formattedDate = formatDate(post.createdAt);
                });
            });


            res.render('Post', { data,});

        } catch (error) {
            res.send(error)
        }
    }


    static async addFormPostRead(req, res) {
        try {
            res.render('addFormPost')
        } catch (error) {
            res.send(error)
        }
    }

    static async addFormPost(req, res) {
        try {

            const { title, description, imgUrl } = req.body
            await Post.create({ title, description, imgUrl })

            res.redirect('/Post')

        } catch (error) {
            res.send(error)


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

        } catch (error) {
            res.send(error)
        }
    }


    static async PostTagsShow(req, res) {
        try {
            res.render('postTags')
        } catch (error) {


            res.send(error)
        }
    }



}

module.exports = Controller