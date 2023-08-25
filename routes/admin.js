const {Router} = require('express')

const { 
    create, 
    index
 } = require('../controllers/admin')
const { 
    checkAdmin
 } = require('../middleware/checkRole')
const { token } = require('jsonwebtoken')




const router = Router()

router.get('/', index)
router.post('/', create )


module.exports = router
