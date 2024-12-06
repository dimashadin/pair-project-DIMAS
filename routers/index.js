const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

const upload = require('../middlewares/multer');


router.get('/', Controller.showHome)

router.get('/Post', Controller.showAllPost)

// Rute form tambah post
router.get('/Post/add', Controller.addForm);

// Rute proses tambah post
router.post('/Post/add', upload.single('imgUrl'), Controller.postAdd);

router.get ('/Profile/:id', Controller.showProfile)

router.get ('/Profile/:id/edit', Controller.showEditForm)
router.get ('/Profile/:id/edit', Controller.postEditForm)

router.get('/Profile/:id/delete', Controller.deletePost)

router.get ('/Tag/:id', Controller.showTag)



module.exports = router