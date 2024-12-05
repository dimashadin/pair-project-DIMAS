const express = require('express')
const Controller = require('../controllers/controller')
const admin = require('../helper/index')
const router = express.Router()

router.get('/', Controller.showHome)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginFormPost)
router.get('/logout', Controller.logOut)

router.get('/register', Controller.RegisterForm)
router.post('/register', Controller.RegisterFormPost)



router.use((req, res, next) => {       //global bisa di pakai di semua asalkan di taruh di paling atas
    // console.log('Time:', Date.now())
    // console.log(req.session, '<<<<<<<<<<<<<<<<<<<<<<<< req sesion console');
    if (!req.session.UserId) {
        const error = `logiin heula bang`
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})











// const coba = function (req, res, next)  { //local/satuuan harus masukin variabel di dalam router
//    console.log('Time:', Date.now())
//     // console.log(req.session, '<<<<<<<<<<<<<<<<<<<<<<<< req sesion console');
//     if (!req.session.UserId) {
//         const error = `logiin heula bang`
//         res.redirect(`/login?error=${error}`)
//     } else {
    //         next()
    //     }
    //     next()
    // }
    
    router.get('/addFormPost',Controller.addFormPostRead)
router.post('/addFormPost',Controller.addFormPost)

router.get('/tag/:id',Controller.showTag)
router.get('/Post', Controller.showAllPost)
router.get('/postTags', admin('Admin'), Controller.PostTagsShow);

// router.get('/postTags',Controller.PostTagsShow)



module.exports = router