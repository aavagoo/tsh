const Logger = require('../logger/Logger');

module.exports = class {
	constructor(driver) {
		this.driver = driver;
	}
	
	findAll() {
		return new Promise((resolve, reject) => {
			this.driver.read()
			.then((data) => {
				let parsedData = JSON.parse(data);
				
				if (typeof parsedData.genres !== 'undefined') {
					resolve(parsedData.genres);
				}
				
				reject(data);
			}).catch(error => {
				Logger.error(error);
			})
		}).catch(error => {
			Logger.error(error);
		});
	}
};
