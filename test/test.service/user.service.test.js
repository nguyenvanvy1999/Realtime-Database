const { expect, assert } = require('chai'), { connect, clearData, closeDatabase } = require('../config/database'),
    UserService = require('../../services/user'), { seedAdmin, seedUser } = require('../config/seed'),
    mongoose = require('mongoose'),
    bcryptHelper = require('../../helpers/bcrypt'), { APIError } = require('../../helpers/error');

before(async() => await connect());
// let user, admin;
// // beforeEach(async() => {
// //     user = await seedUser;
// //     admin = seedAdmin;
// // });

describe('UserService', () => {
    describe('newUser', () => {
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
        it('should throw new APIError', async() => {
            const mockUser = null;
            assert.throws(
                () => UserService.newUser(mockUser),
                APIError,
                "Cannot read property 'email' of null"
            );
        });
    });
});

afterEach(async() => await clearData());
after(async() => await closeDatabase());