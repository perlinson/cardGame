const router = require('express').Router()
const fileController = require('../contorllers/fileController')


router.get('/list', fileController.listFiles)

module.exports = router