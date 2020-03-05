const MovieRepository = require('../repository/MovieRepository');
const GenreRepository = require('../repository/GenreRepository');
const MovieService = require('../services/MovieService');
const GenreService = require('../services/GenreService');
const FileDriver = require('../drivers/FileDriver');
const MovieFilterFactory = require('../filters/movie/FilterFactory');
const MovieBuilder = require('../builders/MovieBuilder');
const FilteringStrategy = require('../strategy/MovieFilteringStrategy');
const Filter = require('../filters/movie/Filter');

exports.list = (req, res) => {
	const movieRepository = new MovieRepository(new FileDriver(), new MovieBuilder(), new MovieFilterFactory()),
		movieService = new MovieService(movieRepository);
	
	movieService.getMovies()
	.then(data => {
		res.render('movie/list', {
			movies: data
		});
	});
};

exports.listFilter = (req, res) => {
	const fileDriver = new FileDriver(),
		filterFactory = new MovieFilterFactory(),
		filters = filterFactory.createFilters(req.query),
		filter = new Filter(filters),
		movieRepository = new MovieRepository(fileDriver, new MovieBuilder(), filter, FilteringStrategy),
		movieService = new MovieService(movieRepository),
		genreService = new GenreService(new GenreRepository(fileDriver));
	
	movieService.getMoviesWithFilter(req.query)
	.then(movies => {
		genreService.getGenres()
		.then(genres => {
			res.render('movie/listFilters', {
				movies: movies,
				genres: genres,
				filters: req.query
			});
		});
	});
};

exports.add = (req, res) => {
	const genreService = new GenreService(new GenreRepository(new FileDriver()));
	
	genreService.getGenres()
	.then(data => {
		res.render('movie/add', {
			genres: data
		});
	});
};

exports.create = (req, res) => {
	const movieRepository = new MovieRepository(new FileDriver(), new MovieBuilder(), new MovieFilterFactory()),
		movieService = new MovieService(movieRepository);
	
	movieService.addMovie(req.body)
	.then(() => {
		res.render('index');
	});
};