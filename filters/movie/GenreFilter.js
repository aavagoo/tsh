const _ = require('underscore');

module.exports = class {
	constructor(filtersData) {
		this.filtersData = filtersData;
	}
	
	filter(movies) {
		let filterGenres = this.filtersData.genres,
			filtersChain = [this.filterWholeGenre, this.filterPairOfGenre, this.filterOneOfGenre],
			thisContext = this;
		
		for (let filterFn of filtersChain) {
			let filteredMovies = filterFn(filterGenres, movies, thisContext);

			if (filteredMovies.length > 0) {
				return filteredMovies;
			}
		}
		
		return movies;
	}
	
	filterWholeGenre(filterGenres, movies) {
		return movies.filter((movie) => {
			let genres = movie.getGenres(),
				commonGenres = _.intersection(genres, filterGenres);
			
			if (genres.length === commonGenres.length && filterGenres.length === commonGenres.length) {
				return true;
			}
		});
	}
	
	filterPairOfGenre(filterGenres, movies, thisContext) {
		let pairedGenres = thisContext.makePairOfGenres(filterGenres);
		
		return movies.filter((movie) => {
			let genres = movie.getGenres();
			
			for (let pairedGenre of pairedGenres) {
				let common = _.intersection(genres, pairedGenre);
				
				if (common.length === pairedGenre.length) {
					return true;
				}
			}
		});
	}
	
	filterOneOfGenre(filterGenres, movies) {
		return movies.filter((movie) => {
			let genres = movie.getGenres(),
				common = _.intersection(genres, filterGenres);
			
			return common.length > 0;
		});
	}
	
	makePairOfGenres(genres) {
		return genres.reduce((acc, val, i1) => [
			...acc,
			...new Array(genres.length - 1 - i1).fill(0)
			.map((v, i2) => ([genres[i1], genres[i1 + 1 + i2]]))
		], []);
	}
};
