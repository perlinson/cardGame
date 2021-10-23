const router = require('express').Router()
const deckController = require('../contorllers/deckController')

router.post('/create', deckController.createDeck)
module.exports = router 