const router = require('express').Router();
const MovieController = require('../controllers/MovieController');
const createMovieValidate = require('../middlewares/movie/CreateValidate');

router.get('/list', MovieController.list);
router.get('/list-filter', MovieController.listFilter);
router.get('/add', MovieController.add);

router.post('/create',
	createMovieValidate.validate,
	createMovieValidate.checkValidation,
	MovieController.create
);

module.exports = router;