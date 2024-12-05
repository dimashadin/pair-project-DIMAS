const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


router.get('/', Controller.showHome)

router.get('/Post', Controller.showAllPost)

router.get ('/Profile/:id', Controller.showProfile)

router.get('/Profile/:id/delete', Controller.deletePost)

router.get ('/Tag/:id', Controller.showTag)



module.exports = router