const mongoose = require('mongoose'),
	{ Mockgoose } = require('mockgoose'),
	{ success, error } = require('log-symbols'),
	{ get } = require('./index'),
	{ MongoMemoryServer } = require('mongodb-memory-server'),
	mongo = new MongoMemoryServer();

mongoose.Promise = global.Promise;
const mongoConfig = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	ignoreUndefined: true,
	useFindAndModify: false,
};
const uri = get('MONGO_URI');
async function open() {
	try {
		if (get('DEBUG') === true) {
			const testUri = await mongo.getUri();
			// const mockgoose = new Mockgoose(mongoose);
			// mockgoose.helper.setDbVersion('4.4.3');
			// await mockgoose.prepareStorage();
			await mongoose.connect(testUri, mongoConfig);
			return console.log(`${success} Connected Test DB ! `);
		}
		await mongoose.connect(uri, mongoConfig);
		return console.log(`${success} Connected DB !`);
	} catch (error) {
		throw new Error(error);
	}
}
async function close() {
	try {
		await mongoose.connection.close();
		return console.log(`${success} Disconnected DB !`);
	} catch (error) {
		throw new Error(error);
	}
}

async function clearData() {
	try {
		const collections = mongoose.connection.collections;
		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany();
		}
	} catch (error) {
		throw new Error(error.message);
	}
}
module.exports = { mongoConfig, open, close, clearData };
