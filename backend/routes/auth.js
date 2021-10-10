const router = require('express').Router()
const authController = require('../contorllers/authController')


router.post('/signin', authController.postSignin)
router.post('/login', authController.postLogin)
router.get('/user', authController.getUser)

module.exports = router