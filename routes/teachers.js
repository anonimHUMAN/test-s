const { Router } = require('express')
const {
    index,
    create,
    show,
    remove,
    update
} = require('../controllers/teachers')


const router = Router()

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.delete('/:id', remove)
router.put('/:id', update)


module.exports = router