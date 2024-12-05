const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


router.get('/', Controller.showHome)

router.get('/Post', Controller.showAllPost)



module.exports = router