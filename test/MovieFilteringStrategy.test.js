const assert = require('assert');
const MovieFilteringStrategy = require('../strategy/MovieFilteringStrategy');

describe('Duration filter test', () => {
	it('It should return that its should be random', () => {
		const filtersData = {
				"durationFrom": 130
			};
		
		assert.equal(MovieFilteringStrategy.isRandomFiltering(filtersData), true);
	});
	
	it('It should return that its should not be random', () => {
		const filtersData = {
			"genres": [
				'Horror'
			]
		};
		
		assert.equal(MovieFilteringStrategy.isRandomFiltering(filtersData), false);
	});
	
	
	it('It should return that its should not be random', () => {
		const filtersData = {
			"genres": [
				'Horror'
			],
			"durationFrom": 130
		};
		
		assert.equal(MovieFilteringStrategy.isRandomFiltering(filtersData), false);
	});
});