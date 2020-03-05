const router = require('express').Router();
const GenreController = require('../controllers/GenreController');

router.get('/list', GenreController.list);

module.exports = router;