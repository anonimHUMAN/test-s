const {Router} = require('express')
const { 
    index,
} = require('../controllers/groups')
const { 
    show, 
} = require('../controllers/students')
const { 
    update, 
    getScore,
    group
} = require('../controllers/studentRoute')



const router = Router()

router.get('/', getScore)
router.get('/profile', show)
router.get('/group/:id', group)
router.put('/profile/:id', update)





module.exports = router