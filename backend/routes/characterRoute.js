const { Router } = require('express')
const router = Router()
const characterController = require('../controllers/characterController')

router.post('/check', characterController.check)

module.exports = router