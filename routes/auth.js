const {Router} = require('express')

const { 
    login
} = require('../middleware/autentification')



const router = Router()

router.post('/signIn', login)

module.exports = router