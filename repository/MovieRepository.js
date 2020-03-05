const Logger = require('../logger/Logger');

module.exports = class {
	constructor(driver, builder) {
		this.driver = driver;
		this.builder = builder;
	}
	
	findAll() {
		return new Promise((resolve, reject) => {
			this.driver.read()
			.then(data => {
				let parsedData = JSON.parse(data),
					movies = [];
				
				if (typeof parsedData.movies !== 'undefined') {
					parsedData.movies.forEach((item) => {
						movies.push(this.builder.build(item));
					});
					
					resolve(movies);
				}
				
				reject(data);
			}).catch(error => {
				Logger.error(error);
			});
		});
	}
	
	save(data) {
		const movie = this.builder.build(data);
		
		return new Promise((resolve, reject) => {
			this.driver.read()
			.then(data => {
				let parsedData = JSON.parse(data);
				
				if (typeof parsedData.movies !== 'undefined') {
					let lastMovie = parsedData.movies.slice(-1)[0];
					
					movie.setId(lastMovie.id + 1);
					parsedData.movies.push(movie);
					
					this.driver.save(JSON.stringify(parsedData, null, 4))
					.then((data) => {
						resolve(data);
					}).catch(error => {
						Logger.error(error);
					});
				}
			}).catch(error => {
				Logger.error(error);
			});
		});
	}
};
