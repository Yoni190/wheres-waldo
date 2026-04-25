const { Router } = require('express')
const router = Router()
const roundController = require('../controllers/roundController')

router.post('/start', roundController.start)
router.post('/set-name', roundController.setName)
router.get('/:level', roundController.index)

module.exports = router