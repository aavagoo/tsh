const {check, validationResult} = require('express-validator');
const GenreRepository = require('../../repository/GenreRepository');
const GenreService = require('../../services/GenreService');
const FileDriver = require('../../drivers/FileDriver');
const Logger = require('../../logger/Logger');

exports.validate = [
	check('title').not().isEmpty().withMessage('Title is required'),
	check('year').not().isEmpty().withMessage('Year is required'),
	check('runtime').not().isEmpty().withMessage('Runtime is required'),
	check('director').not().isEmpty().withMessage('Director is required'),
	check('year').isLength({max: 255}).withMessage('Title should has maximum 255 letters'),
	check('director').isLength({max: 255}).withMessage('Title should has maximum 255 letters'),
	check('year').isInt().withMessage('Year should be number'),
	check('runtime').isInt().withMessage('Runtime should be number'),
];

exports.checkValidation = (req, res, next) => {
	const errors = validationResult(req);
	
	if (errors.isEmpty()) {
		next();
		return;
	}
	
	const genreService = new GenreService(new GenreRepository(new FileDriver()));
	
	genreService.getGenres()
	.then(data => {
		res.render('movie/add', {
			genres: data,
			validated: req.body,
			errors: errors.mapped(),
		});
	}).catch(error => {
		Logger.error(error);
	});
};
