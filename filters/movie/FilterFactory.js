const DurationFilter = require('./DurationFilter');
const GenreFilter = require('./GenreFilter');

module.exports = class {
	createFilters(filtersData) {
		const filters = [];

		if (!((typeof filtersData.durationFrom === 'undefined' || filtersData.durationFrom === '') && (typeof filtersData.durationTo === 'undefined' || filtersData.durationTo === ''))) {
			filters.push(new DurationFilter(filtersData));
		}
		
		if (typeof filtersData.genres !== 'undefined' && Array.isArray(filtersData.genres)) {
			filters.push(new GenreFilter(filtersData));
		}
		
		return filters;
	}
};

