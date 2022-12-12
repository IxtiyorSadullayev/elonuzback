const { getAll, getMy, getAdd } = require('../controllers/elon');
const submitMiddleware = require('../helpers/loginMiddleware');

const router= require('express').Router();

router.get('/all', getAll)
router.get('/my',submitMiddleware,  getMy)
router.post('/add', submitMiddleware, getAdd)
router.get('/top')


module.exports = router;