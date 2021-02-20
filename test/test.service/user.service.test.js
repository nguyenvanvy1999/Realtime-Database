const { expect, should } = require('chai'),
	assert = require('assert'),
	mongoose = require('mongoose'),
	UserService = require('../../services/user'),
	User = require('../../models/user'),
	{ seedAdmin, seedUser } = require('../config/seed'),
	{ connect, clearData, closeDatabase } = require('../config/database'),
	bcryptHelper = require('../../helpers/bcrypt'),
	{ APIError } = require('../../helpers/error');

before(async () => await connect());
let user, admin;
beforeEach(async () => {
	user = await seedUser();
	admin = await seedAdmin();
});

describe('UserService', () => {
	describe('new user and insert to DB', () => {
		it('true => save user to DB', async () => {
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
		it('ignore value when new user => throw new APIError', async () => {
			assert.throws(() => UserService.newUser(null), APIError);
		});
		it('ignore value when save => throw new APIError', async () => {
			await assert.rejects(async () => await UserService.insert(null), APIError);
		});
	});
	describe('edit user profile by email', () => {
		it('true => edit user', async () => {
			const mockUser = {
				firstName: '1234',
				lastName: '5678',
			};
			const result = await UserService.editUser(admin.email, mockUser);
			expect([result.firstName, result.lastName]).eql([mockUser.firstName, mockUser.lastName]);
		});
		it('no user found => return null', async () => {
			const result = await UserService.editUser('test.mail');
			expect(result).to.equal(null);
		});
	});
	describe('delete user by email', () => {
		it('true => delete user', async () => {
			await UserService.deleteUserByEmail(admin.email);
			const result = await User.find();
			expect(result).to.have.length(1); //before have 2 user (user and admin)
		});
		it('no user found => return an null', async () => {
			const result = await UserService.deleteUserByEmail('test.mail');
			expect(result).to.equal(null);
		});
	});
	describe('get user by email', () => {
		it('true => return user', async () => {
			const result = await UserService.getUserByEmail(admin.email);
			expect(result.toJSON()).to.eql(admin.toJSON());
		});
		it('no user found => return null', async () => {
			const result = await UserService.getUserByEmail('example@example.com');
			expect(result).to.equal(null);
		});
		it('no email => return null', async () => {
			const result = await UserService.getUserByEmail();
			expect(result).to.equal(null);
		});
	});
	describe('search user', () => {
		//FIXME: error
		describe('search by email', () => {
			it('true => return user', async () => {
				const result = await UserService.search(admin);
			});
			it('false => return null', async () => {
				const test = {
					email: 'admin',
					username: undefined,
				};
				const result = await UserService.search(test);
			});
			it('null => return all user', async () => {});
		});
		describe('search by username', async () => {});
		describe('all user', async () => {});
	});
});
afterEach(async () => await clearData());
after(async () => await closeDatabase());
