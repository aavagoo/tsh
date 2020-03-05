const assert = require('assert');
const MovieBuilder = require('../builders/MovieBuilder');
const DurationFilter = require('../filters/movie/DurationFilter');

describe('Duration filter test', () => {
	const moviesData = [
		{
			"id": 145,
			"title": "A Separation",
			"year": "2011",
			"runtime": "100",
			"genres": [
				"Drama",
				"Mystery"
			],
			"director": "Asghar Farhadi",
			"actors": "Peyman Moaadi, Leila Hatami, Sareh Bayat, Shahab Hosseini",
			"plot": "test",
			"posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTYzMzU4NDUwOF5BMl5BanBnXkFtZTcwMTM5MjA5Ng@@._V1_SX300.jpg"
		},
		{
			"id": 146,
			"title": "The Big Short",
			"year": "2015",
			"runtime": "130",
			"genres": [
				"Biography",
				"Comedy",
				"Drama"
			],
			"director": "Adam McKay",
			"actors": "Ryan Gosling, Rudy Eisenzopf, Casey Groves, Charlie Talbert",
			"plot": "test",
			"posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
		}
	];
	
	
	const movies = [],
		movieBuilder = new MovieBuilder();
	
	moviesData.forEach(movieData => {
		movies.push(movieBuilder.build(movieData));
	});
	
	it('It should return only movie, which has 120+ runtime', () => {
		const filtersData = {
				"durationFrom": 130
			},
			durationFilter = new DurationFilter(filtersData);
		
		assert.equal(durationFilter.filter(movies).length, 1);
	});
	
	it('It should return only movie, which has runtime between 90 and 100', () => {
		const filtersData = {
				"durationFrom": 100,
				"durationTo": 110
			},
			durationFilter = new DurationFilter(filtersData);
		
		assert.equal(durationFilter.filter(movies).length, 1);
	});
	
	it('It should return any movie', () => {
		const filtersData = {
				"durationFrom": 141,
			},
			durationFilter = new DurationFilter(filtersData);
		
		assert.equal(durationFilter.filter(movies).length, 0);
	});
});