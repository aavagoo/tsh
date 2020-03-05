const MovieRepository = require('../repository/MovieRepository');
const MovieService = require('../services/MovieService');
const FileDriver = require('../drivers/FileDriver');
const MovieBuilder = require('../builders/MovieBuilder');
const Logger = require('../logger/Logger');

exports.list = (req, res) => {
	const movieRepository = new MovieRepository(new FileDriver(), new MovieBuilder()),
		movieService = new MovieService(movieRepository);
	
	movieService.getMovies()
	.then(data => {
		res.render('movie/list', {
			movies: data
		});
	}).catch(error => {
		Logger.error(error);
	});
};

exports.listFilter = (req, res) => {
	res.json('listFilter');
};

exports.add = (req, res) => {
	res.json('add');
};

exports.create = (req, res) => {
	res.json('create');
};
