module.exports = class {
	constructor(genreRepository) {
		this.genreRepository = genreRepository;
	}
	
	getGenres() {
		return new Promise((resolve, reject) => {
			this.genreRepository.findAll()
			.then((data) => {
				resolve(data);
			});
		});
	}
};