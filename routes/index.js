const {Router} = require('express')
const { 
    index
 } = require('../controllers')

const router = Router()

router.get('/', index)

module.exports = router