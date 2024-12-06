const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.get('/', Controller.showHome)

router.get('/Post', Controller.showAllPost)


router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginFormPost)

router.get('/register', Controller.RegisterForm)
router.post('/register', Controller.RegisterFormPost)

router.get('/logout', Controller.logOut)











router.get('/Post/add', Controller.addForm)
router.post('/Post/add', Controller.postAdd)

router.get('/Profile/:id', Controller.showProfile)

router.get('/Profile/:id/edit', Controller.showEditForm)
router.post('/Profile/:id/edit', Controller.postEditForm)

router.get('/Profile/:id/delete', Controller.deletePost)

router.get('/Tag/:id', Controller.showTag)
router.get('/tag/:id', Controller.showTag)


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

router.post('/Post/add', upload.single('imgUrl'), async (req, res) => {
    const { title, description, ProfileId } = req.body;
    const imgUrl = `/uploads/${req.file.filename}`; // Simpan path file yang diunggah
  
    await Post.create({ title, description, imgUrl, ProfileId });
    res.redirect('/Post');
  });
  











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





module.exports = router