const Movie = require('../models/Movie');

module.exports = class {
	build(data) {
		let movie = new Movie();
		
		if (typeof data.id !== 'undefined') {
			movie.setId(data.id);
		}
		
		movie.setTitle(data.title);
		movie.setYear(data.year);
		movie.setRuntime(data.runtime);
		movie.setGenres(data.genres);
		movie.setDirector(data.director);
		movie.setActors(data.actors);
		movie.setPlot(data.plot);
		movie.setPosterUrl(data.posterUrl);
		
		return movie;
	}
};
