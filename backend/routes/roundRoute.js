const { Router } = require('express')
const router = Router()
const roundController = require('../controllers/roundController')

router.post('/start', roundController.start)

module.exports = router