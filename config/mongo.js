const mongoose = require('mongoose'),
	{ Mockgoose } = require('mockgoose'),
	{ success, error } = require('log-symbols'),
	{ get } = require('./index');

const mongoConfig = {
	//config for connecting mongoDB
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	ignoreUndefined: true,
	useFindAndModify: false,
};
const uri = get('MONGO_URI');

function connect() {
	return new Promise((resolve, reject) => {
		if (get('DEBUG') === true) {
			const mockgoose = new Mockgoose(mongoose);
			mockgoose.helper.setDbVersion('4.4.3');
			mockgoose
				.prepareStorage()
				.then(function () {
					mongoose.connect(uri, (err, res) => {
						if (err) return reject(err);
						resolve(console.log(`${success} ${mongoConfig.host}`));
					});
				})
				.catch(reject);
		} else {
			mongoose.connect(uri, mongoConfig, (err, res) => {
				if (err) return reject(err);
				resolve(console.log(`${success} ${uri}`));
			});
		}
	});
}

async function disconnect() {
	try {
		await mongoose.disconnect();
		return console.log(`${success} Disconnect`);
	} catch (err) {
		return console.log(`${error} Disconnect Failed`);
	}
}

module.exports = { connect, disconnect, mongoConfig };
