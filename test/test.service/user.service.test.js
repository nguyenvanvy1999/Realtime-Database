const { expect } = require('chai');
const { connect, clearData, closeDatabase } = require('../config/database'),
    UserService = require('../../services/user'), { seedAdmin, seedUser } = require('../config/seed'),
    jest = require('jest'),
    mongoose = require('mongoose'),
    chai = require('chai'),
    bcryptHelper = require('../../helpers/bcrypt');

let user;

beforeAll(async() => await connect());
beforeEach(async() => {
    user = await seedUser;
});
describe('UserService', () => {
    describe('newUser', async() => {
        it('should  return  a new user');
        const mockUser = {
            email: 'test@example.com',
            username: 'test',
            password: 'password',
        };
        const newUser = UserService.newUser(mockUser);
        const password = await bcryptHelper.hash('password');
        expect(mongoose.Types.ObjectId.isValid(newUser._id)).isEqual(true);
        expect(newUser.email).toEqual(mockUser.email);
        expect(newUser.username).toEqual(mockUser.username);
        expect(newUser.password).toEqual(password);
        expect(newUser.isActive).toEqual(false);
        expect(newUser.roles).toEqual('User');
    });
});

afterEach(async() => await clearData());
afterAll(async() => await closeDatabase());