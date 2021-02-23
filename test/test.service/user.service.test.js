const { expect, should } = require('chai'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    UserService = require('../../services/user'),
    User = require('../../models/user'), { seedAdmin, seedUser } = require('../mocks/seed'), { connect, clearData, closeDatabase } = require('../config/database'),
    bcryptHelper = require('../../helpers/bcrypt'), { APIError } = require('../../helpers/error');

before(async() => await connect());
let user, admin;
beforeEach(async() => {
    user = await seedUser();
    admin = await seedAdmin();
});

describe('UserService', () => {
    describe('new user and insert to DB', () => {
        it('true => save user to DB', async() => {
            const mockUser = {
                email: 'test@example.com',
                firstName: 'first',
                lastName: 'last',
                password: 'password',
            };
            const newUser = UserService.newUser(mockUser);
            const user = await UserService.insert(newUser);
            expect(mongoose.Types.ObjectId.isValid(user._id)).to.equal(true);
            expect(user.roles).equal('User');
            expect([user.email, user.firstName, user.lastName]).eql([mockUser.email, mockUser.firstName, mockUser.lastName]);
            expect(await bcryptHelper.compare(mockUser.password, user.password)).equal(true);
            expect(user.isActive).equal(false);
        });
        it('ignore value when new user => throw new APIError', async() => {
            assert.throws(() => UserService.newUser(null), APIError);
        });
        it('ignore value when save => throw new APIError', async() => {
            await assert.rejects(async() => await UserService.insert(null), APIError);
        });
    });
    describe('search user', () => {
        //FIXME: error
        describe('search by email', () => {
            it('true => return user', async() => {
                const result = await UserService.search(admin);
            });
            it('false => return null', async() => {
                const test = {
                    email: 'admin',
                    username: undefined,
                };
                const result = await UserService.search(test);
            });
            it('null => return all user', async() => {});
        });
        describe('search by username', async() => {});
        describe('all user', async() => {});
    });
});
afterEach(async() => await clearData());
after(async() => await closeDatabase());