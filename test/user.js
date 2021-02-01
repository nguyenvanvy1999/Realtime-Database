const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const mongoose = require('mongoose');
const User = require('../models/user');

const expect = chai.expect();

chai.use(chaiHttp);
describe('User', () => {
    beforeEach(async(done) => {
        await User.deleteMany({}); //remove all data user in mongo before test
        done();
    });
    describe('get-all-user', () => {
        it('it should GET all the users', async() => {
            try {
                let result = await chai.request(server).get('/user/get-all-user');
                expect(result.statusCode).to.equal(200);
                expect(result.body).should.be.a('array');
                expect(result.body.length).should.be.eql(0);
            } catch (error) {
                console.log(error);
            }
        });
    });
});