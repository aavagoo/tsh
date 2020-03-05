module.exports = class {
	constructor(movieRepository) {
		this.movieRepository = movieRepository;
	}
	
	getMovies() {
		return new Promise((resolve, reject) => {
			this.movieRepository.findAll()
			.then((data) => {
				resolve(data);
			});
		});
	}
	
	getMoviesWithFilter(filterData) {
		return new Promise((resolve, reject) => {
			this.movieRepository.findWithFilters(filterData)
			.then((data) => {
				resolve(data);
			});
		});
	}
	
	addMovie(movie) {
		return new Promise((resolve, reject) => {
			this.movieRepository.save(movie)
			.then((data) => {
				resolve(data);
			});
		});
	}
};