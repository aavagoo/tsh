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
};
