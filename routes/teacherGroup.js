const {Router} = require('express')
const { 
    index 
} = require('../controllers/groups')
const { 
    show 
} = require('../controllers/teachers')



const router = Router()

router.get('/', index)
router.get('/profile/:id', show)




module.exports = router