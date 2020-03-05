const assert = require('assert');
const MovieBuilder = require('../builders/MovieBuilder');

describe('Movie builder test', () => {
	it('It should return properly count of models', () => {
		const moviesData = [
			{
				"id": 145,
				"title": "A Separation",
				"year": "2011",
				"runtime": "123",
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
		
		assert.equal(movies.length, 2);
	});
});