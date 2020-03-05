exports.notFound = (req, res, next) => {
	const error = new Error('404 page not found');

	error.status = 404;

	next(error);
};

exports.catchErrors = (err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message
	});
};