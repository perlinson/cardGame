const router = require('express').Router()
const roomController = require('../contorllers/roomController')
router.get('/', roomController.listRoom)
router.post('/createRoom', roomController.createRoom)
router.patch('/:room_id', roomController.joinRoom)
module.exports = router 