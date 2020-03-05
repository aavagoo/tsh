const Logger = require('../logger/Logger');

module.exports = class {
	constructor(movieRepository) {
		this.movieRepository = movieRepository;
	}
	
	getMovies() {
		return new Promise((resolve, reject) => {
			this.movieRepository.findAll()
			.then((data) => {
				resolve(data);
			}).catch(error => {
				Logger.error(error);
			});
		});
	}
};