const { APIError } = require('../helpers/ErrorHandler');
const User = require('../models/user');

function checkUsernameAndPassword(req, res, next) {
    try {
        const { email, newUsername, newPassword } = req.body;
        if (newPassword.length < 4) {
            return res
                .status(400)
                .send({ message: 'Password must be at least 4 character !' });
        }
        User.findOne({ username: newUsername }).then((user) => {
            console.log(user);
            if (user != null && user.email != email) {
                return res.status(400).send({ message: 'Username is already exits!' });
            } else {
                next();
            }
        });
    } catch (error) {
        return res.status(400), send(error);
    }
}
module.exports = { checkUsernameAndPassword };