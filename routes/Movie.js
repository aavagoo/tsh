const router = require('express').Router();
const MovieController = require('../controllers/MovieController');

router.get('/list', MovieController.list);
router.get('/list-filter', MovieController.listFilter);
router.get('/add', MovieController.add);

router.post('/create',
	MovieController.create
);

module.exports = router;