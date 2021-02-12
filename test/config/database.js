const mongoose = require('mongoose'),
    { MongoMemoryServer } = require('mongodb-memory-server'),
    mongo = new MongoMemoryServer(),
    mongoConfig = require('../../config/constant/mongo');

async function connect() {
    try {
        const uri = await mongo.getUri();
        await mongoose.connect(uri, mongoConfig.setting);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function closeDatabase() {
    try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    } catch (error) {
        throw new Error(error.message);
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

module.exports = { connect, closeDatabase, clearData };