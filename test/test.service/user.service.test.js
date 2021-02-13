const { expect } = require('chai'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    UserService = require('../../services/user'), { seedAdmin, seedUser } = require('../config/seed'), { connect, clearData, closeDatabase } = require('../config/database'),
    bcryptHelper = require('../../helpers/bcrypt'), { APIError } = require('../../helpers/error');

before(async() => await connect());
// let user, admin;
// beforeEach(async() => {
//     user = await seedUser;
//     admin = seedAdmin;
// });

describe('UserService', () => {
    describe('new user and insert to DB', () => {
        it('should save user to DB', async() => {
            const mockUser = {
                email: 'test@example.com',
                username: 'test',
                password: 'password',
            };
            const newUser = UserService.newUser(mockUser);
            const user = await UserService.insert(newUser);
            expect(mongoose.Types.ObjectId.isValid(user._id)).to.equal(true);
            expect(user.roles).equal('User');
            expect([user.email, user.username]).eql([
                mockUser.email,
                mockUser.username,
            ]);
            expect(
                await bcryptHelper.compare(mockUser.password, user.password)
            ).equal(true);
            expect(user.isActive).equal(false);
        });
        it('ignore some value => throw new APIError', async() => {
            assert.throws(
                () => UserService.newUser(null),
                APIError,
                "Cannot read property 'email' of null"
            );
        });
    });
    describe('edit user', () => {
        it('should edit user', async() => {
            const seedUser = await seedAdmin();
            const mockUser = {
                username: 'edit',
                password: '1234',
            };
            const user = await UserService.editUser(
                seedUser.email,
                mockUser.username,
                mockUser.password
            );
            expect([user.email, user.username, user.password]).eql([
                seedUser.email,
                mockUser.username,
                mockUser.password,
            ]);
        });
    });
});

afterEach(async() => await clearData());
after(async() => await closeDatabase());