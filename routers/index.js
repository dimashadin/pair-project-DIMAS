const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.showHome)



router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginFormPost)

router.get('/register', Controller.RegisterForm)
router.post('/register', Controller.RegisterFormPost)

router.get('/logout', Controller.logOut)


router.use((req, res, next) => {       //global bisa di pakai di semua asalkan di taruh di paling atas
    // console.log('Time:', Date.now())
    // console.log(req.session, '<<<<<<<<<<<<<<<<<<<<<<<< req sesion console');
    if (!req.session.UserId) {
        const error = `You have to login first`
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
    
    router.get('/Post', Controller.showAllPost)
    router.get('/addFormPost',Controller.addFormPostRead)
router.post('/addFormPost',Controller.addFormPost)

router.get('/tag/:id',Controller.showTag)





module.exports = router