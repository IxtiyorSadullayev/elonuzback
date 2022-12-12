const { login, register, tekshir } = require('../controllers/user');
const submitMiddleware = require('../helpers/loginMiddleware');

const router = require('express').Router();

router.post('/login', login)
router.post('/register', register)
router.get('/', submitMiddleware, tekshir)
router.get('/tekshir', submitMiddleware, (req,res)=>{
    res.status(200).json('ok')
})

module.exports = router;