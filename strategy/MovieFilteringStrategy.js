module.exports = {
	isRandomFiltering(filtersData) {
		return !(typeof filtersData.genres !== 'undefined' && Array.isArray(filtersData.genres));
	}
};
