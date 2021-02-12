const mongoConfig = {
    host: 'mongodb://localhost:27017/Project1',
    setting: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
    },
};
module.exports = mongoConfig;