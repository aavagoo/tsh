module.exports = class {
	constructor(filtersData) {
		this.filtersData = filtersData;
	}
	
	filter(movies) {
		return movies.filter(movie => {
			let movieRuntime = movie.getRuntime();
			
			if (typeof this.filtersData.durationFrom !== 'undefined' && this.filtersData.durationFrom !== '' && typeof this.filtersData.durationTo !== 'undefined' && this.filtersData.durationTo !== '') {
				return movieRuntime >= parseInt(this.filtersData.durationFrom) - 10 && movieRuntime <= parseInt(this.filtersData.durationTo) + 10;
			} else if (typeof this.filtersData.durationFrom !== 'undefined' && this.filtersData.durationFrom !== '') {
				return movieRuntime >= parseInt(this.filtersData.durationFrom) - 10;
			} else if (typeof this.filtersData.durationTo !== 'undefined' && this.filtersData.durationTo !== '') {
				return movieRuntime <= parseInt(this.filtersData.durationTo) + 10;
			}
		});
	}
};