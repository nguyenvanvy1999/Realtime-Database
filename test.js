const JoiBase = require('joi');
const Joi = JoiBase.extend(require('joi-jwt'));

const schema = Joi.jwt().valid({ secret: 'secret-key' }).required();

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlIjoiaHR0cHM6Ly9yYWxhYnMub3JnIiwiaWF0IjoxNTU1Njk5Njg5fQ.1-YemibEH2bC7EqoQtG2naPRui0MP8Ma-Y5mAKYoJDU';
const { result, error } = schema.validate(token);
console.log('result', result);
console.log('error', error);