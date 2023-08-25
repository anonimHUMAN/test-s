const {Router} = require('express')
const { 
    index, 
    create,
    remove,
    update
 } = require('../controllers/attendance')

const router = Router()

router.get('/', index)
router.post('/', create)
router.delete('/', remove)
router.put('/', update)


module.exports = router