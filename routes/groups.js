const {Router} = require('express')
const { 
    index, 
    create,
    show,
    remove,
    update
 } = require('../controllers/groups')

const router = Router()

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.delete('/', remove)
router.put('/', update)
 

module.exports = router