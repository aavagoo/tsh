const MovieRepository = require('../repository/MovieRepository');
const GenreRepository = require('../repository/GenreRepository');
const MovieService = require('../services/MovieService');
const GenreService = require('../services/GenreService');
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

exports.add = (req, res) => {
	const genreService = new GenreService(new GenreRepository(new FileDriver()));
	
	genreService.getGenres()
	.then(data => {
		res.render('movie/add', {
			genres: data
		});
	}).catch(error => {
		Logger.error(error);
	});
};

exports.create = (req, res) => {
	const movieRepository = new MovieRepository(new FileDriver(), new MovieBuilder()),
		movieService = new MovieService(movieRepository);
	
	movieService.addMovie(req.body)
	.then(() => {
		res.render('index');
	}).catch(error => {
		Logger.error(error);
	});
};
