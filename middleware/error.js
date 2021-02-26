const { errorHandler, APIError } = require('../helpers/error'),
	logger = require('../helpers/winston');

function handleNotFoundPage(req, res) {
	return res.status(404).json({ message: 'Page not found' });
}

function handleError(err, req, res, next) {
	logger.error(err);
	if (!errorHandler.isTrustedError(err)) {
		return res.status(400).send({ message: err.message });
	}
	if (err.name === 'MongoError' && err.code === 11000) {
		let [_, collection, field, value] = err.message.match(
			/collection: [a-z]*\.([a-z]*)\sindex:\s([a-z]+).*{\s?[a-zA-z0-9]*:\s?"?([a-z0-9@. ]+)"?/i
		);
		err = new APIError({
			message: ` ${collection} exist ${field} : ${value}`,
			status: 409,
		});
	}
	if (err.name === 'MulterError') {
		err = new APIError({
			message: err.message,
			status: err.status || 500,
		});
	}
	if (err) {
		err = new APIError({
			message: err.message,
			status: err.status || 500,
			errors: err.error,
		});
	}
	return res.status(err.status).json(err);
}

module.exports = { handleNotFoundPage, handleError };
