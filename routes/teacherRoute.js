const { Router } = require('express')
const {
    index,
} = require('../controllers/groups')
const {
    update,
    getStudents,
    showProfile
} = require('../controllers/teacherGroup')
const {
    create, 
    show, 
} = require('../controllers/students')


const router = Router()

router.get('/', index)
router.get('/profile', showProfile)
router.put('/profile', update)
router.post('/student', create )
router.get('/student/:id', show )
router.get('/getStudents', getStudents )





module.exports = router