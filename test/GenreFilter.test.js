const assert = require('assert');
const MovieBuilder = require('../builders/MovieBuilder');
const GenreFilter = require('../filters/movie/GenreFilter');

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
		},
		{
			"id": 146,
			"title": "The test movie",
			"year": "2015",
			"runtime": "130",
			"genres": [
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
	
	it('It should return only movie, which has all three genres', () => {
		const filtersData = {
				"genres": [
					"Biography",
					"Comedy",
					"Drama"
				]
			},
			durationFilter = new GenreFilter(filtersData);
		
		assert.equal(durationFilter.filter(movies).length, 1);
		assert.equal(durationFilter.filter(movies)[0].getTitle(), 'The Big Short');
	});
	
	it('It should return two movies, with Comedy and Drama genre', () => {
		const filtersData = {
				"genres": [
					"Biography",
					"Comedy",
					"Drama",
					"Test"
				]
			},
			durationFilter = new GenreFilter(filtersData);
		
		assert.equal(durationFilter.filter(movies).length, 2);
		assert.equal(durationFilter.filter(movies)[0].getTitle(), 'The Big Short');
		assert.equal(durationFilter.filter(movies)[1].getTitle(), 'The test movie');
	});
	
	it('It should return three movies with Drama genre', () => {
		const filtersData = {
				"genres": [
					"Drama",
					"Test"
				]
			},
			durationFilter = new GenreFilter(filtersData);
		
		assert.equal(durationFilter.filter(movies).length, 3);
	});
});