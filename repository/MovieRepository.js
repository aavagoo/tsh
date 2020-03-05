module.exports = class {
	constructor(driver, builder, filter, filterStrategy) {
		this.driver = driver;
		this.builder = builder;
		this.filter = filter;
		this.filterStrategy = filterStrategy;
	}
	
	findAll() {
		return new Promise((resolve, reject) => {
			this.driver.read()
			.then(data => {
				let parsedData = JSON.parse(data),
					movies = [];
				
				if (typeof parsedData.movies !== 'undefined') {
					parsedData.movies.forEach((item) => {
						movies.push(this.builder.build(item));
					});
					
					resolve(movies);
				}
				
				reject(data);
			});
		});
	}
	
	findWithFilters(filtersData) {
		return new Promise((resolve, reject) => {
			this.findAll()
			.then(movies => {
				resolve(this.filterData(filtersData, movies));
			});
		});
		
	}
	
	filterData(filtersData, data) {
		let filteredData = this.filter.filter(data);
		
		if (this.filterStrategy.isRandomFiltering(filtersData)) {
			filteredData = [filteredData[Math.floor(Math.random() * filteredData.length)]];
		}
		
		return filteredData;
	}
	
	save(data) {
		const movie = this.builder.build(data);
		
		return new Promise((resolve, reject) => {
			this.driver.read()
			.then(data => {
				let parsedData = JSON.parse(data);
				
				if (typeof parsedData.movies !== 'undefined') {
					let lastMovie = parsedData.movies.slice(-1)[0];
					
					movie.setId(lastMovie.id + 1);
					parsedData.movies.push(movie);
					
					this.driver.save(JSON.stringify(parsedData, null, 4))
					.then((data) => {
						resolve(data);
					});
				}
			});
		});
	}
};