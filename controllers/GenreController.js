const GenreService = require('../services/GenreService');
const GenreRepository = require('../repository/GenreRepository');
const FileDriver = require('../drivers/FileDriver');
const Logger = require('../logger/Logger');

exports.list = (req, res) => {
	const genreService = new GenreService(new GenreRepository(new FileDriver()));
	
	genreService.getGenres()
	.then((data) => {
		res.render('genre/list', {
			genres: data
		});
	}).catch(error => {
		Logger.error(error);
	});
};