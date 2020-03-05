const fs = require('fs');
const dotenv = require('dotenv').config();

module.exports = class {
	read() {
		return new Promise((resolve, reject) => {
			fs.readFile(`${__dirname}/../data/${process.env.DATA_FILE_NAME}`, 'utf-8', (err, data) => {
				if (err) {
					reject(err);
				}

				resolve(data);
			});
		});
	}
	
	save(data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(`${__dirname}/../data/${process.env.DATA_FILE_NAME}`, data, (err) => {
				if (err) {
					reject(err);
				}

				resolve(data);
			});
		});
	}
};
