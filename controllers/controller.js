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


            let data = await Post.findAll({
                include: {
                    model: Profile
                }
            });


            res.render('Post', { data })
        } catch (error) {
            // console.log(error);
            res.send(error);
        }
    }



    static async addForm(req, res) {
        try {
            let data = await Post.findAll({
                include: {
                    model: Profile
                }
            })
            // res.send(data)
            res.render('formAddPost', { data })

        } catch (error) {
            res.send(error)
            // console.log(error);  
        }
    }

    static async postAdd(req, res) {
        try {
            // console.log(req.body);

            await Post.create(req.body)

            res.redirect('/Post')


        } catch (error) {
            res.send(error)
            console.log(error);

        }
    }

    static async showEditForm(req, res) {
        try {
            let { id } = req.params
            let data = await Post.findByPk(+id, {
                include: {
                    model: Profile
                }
            });
            //   res.send(data)



            res.render('editForm', { data })

        } catch (error) {
            console.log(error);
            res.send(error)

        }
    }

    static async postEditForm(req, res) {
        try {
            // console.log(req.body);

            let { id } = req.params



        } catch (error) {
            console.log(error);
            res.send(error)
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


    static async PostTagsShow(req, res) {
        try {
            res.render('postTags')
        } catch (error) {


            res.send(error)
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




}

module.exports = Controller