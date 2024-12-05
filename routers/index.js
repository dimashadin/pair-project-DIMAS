const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


router.get('/', Controller.showHome)

router.get('/Post', Controller.showAllPost)

router.get('/Post/add', Controller.addForm)
router.post('/Post/add', Controller.postAdd)

router.get ('/Profile/:id', Controller.showProfile)

router.get ('/Profile/:id/edit', Controller.showEditForm)
router.get ('/Profile/:id/edit', Controller.postEditForm)

router.get('/Profile/:id/delete', Controller.deletePost)

router.get ('/Tag/:id', Controller.showTag)



module.exports = router