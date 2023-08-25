const { Router } = require('express')
const {
    index,
    create,
    show,
    remove,
    update,
    addStudentToGroup,
    removeStudentFromGroup
} = require('../controllers/students')

const router = Router()

router.post('/manage', addStudentToGroup)
router.put('/manage', removeStudentFromGroup)

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.delete('/:id', remove)
router.put('/:id', update)

module.exports = router