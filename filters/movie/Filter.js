module.exports = class {
	constructor(filters) {
		this.filters = filters;
	}
	
	filter(movies) {
		this.filters.forEach(filter => {
			movies = filter.filter(movies);
		});
		
		return movies;
	}
};
