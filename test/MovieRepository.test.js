const assert = require('assert');
const MovieBuilder = require('../builders/MovieBuilder');
const Filter = require('../filters/movie/Filter');
const FilteringStrategy = require('../strategy/MovieFilteringStrategy');
const MovieRepository = require('../repository/MovieRepository');
const FileDriver = require('../drivers/FileDriver');
const MovieFilterFactory = require('../filters/movie/FilterFactory');


describe('Movie repository test', () => {
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
	
	const filterFactory = new MovieFilterFactory();
	
	it('It should return one random model', () => {
		const filtersData = {
			"durationFrom": 100,
		};
		
		const filters = filterFactory.createFilters(filtersData),
			filter = new Filter(filters),
			movieRepository = new MovieRepository(new FileDriver(), new MovieBuilder(), filter, FilteringStrategy);
		
		assert.equal(movieRepository.filterData(filtersData, movies).length, 1);
	});
	
	it('It should return several models', () => {
		const filtersData = {
			"genres": [
				'Drama'
			],
		};
		
		const filters = filterFactory.createFilters(filtersData),
			filter = new Filter(filters),
			movieRepository = new MovieRepository(new FileDriver(), new MovieBuilder(), filter, FilteringStrategy);
		
		assert.equal(movieRepository.filterData(filtersData, movies).length, 2);
	});
	
	it('It should return only one random model', () => {
		const filtersData = {};
		
		const filters = filterFactory.createFilters(filtersData),
			filter = new Filter(filters),
			movieRepository = new MovieRepository(new FileDriver(), new MovieBuilder(), filter, FilteringStrategy);
		
		assert.equal(movieRepository.filterData(filtersData, movies).length, 1);
	});
});