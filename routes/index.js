const router = require('express').Router();
const genreRoutes = require('./Genre');
const movieRoutes = require('./Movie');

router.use('/genre', genreRoutes);
router.use('/movie', movieRoutes);

router.get('/', (req, res) => {
	res.render('index');
});

module.exports = router;