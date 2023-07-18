const UserController = require('../controllers/userController');

module.exports = (app) => {
    app.post('/register', UserController.createUser);
    app.post('/login', UserController.loginUser);
    // app.post('/logout', UserController.logoutUser);
}