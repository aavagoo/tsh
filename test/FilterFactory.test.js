const assert = require('assert');
const FilterFactory = require('../filters/movie/FilterFactory');

describe('Filter factory test', () => {
	const filterFactory = new FilterFactory();
	
	it('It should return genre and duration filter', () => {
		const filtersData = {
			"genres": [
				'horror'
			],
			"durationFrom": 200,
		},
		filters = filterFactory.createFilters(filtersData);
		
		assert.equal(filters.length, 2);
	});
	
	it('It should return only genre filter', () => {
		const filtersData = {
			"genres": [
				'horror'
			],
		},
		filters = filterFactory.createFilters(filtersData);
		
		assert.equal(filters.length, 1);
		assert.equal(typeof filters[0].filterWholeGenre === 'function', true);
	});
	
	it('It should return only duration filter', () => {
		const filtersData = {
			"durationFrom": 200
		},
		filters = filterFactory.createFilters(filtersData);

		assert.equal(filters.length, 1);
		assert.equal(typeof filters[0].filterWholeGenre !== 'function', true);
	});
});