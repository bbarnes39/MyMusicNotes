const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required.'],
        minLength: [3, 'Username must be at least 3 characters.']
    },
    email: {
        type: String,
        required: [true, 'Email required.'],
        validate: [isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: [true, 'Password required.'],
        minLength: [8, 'Password must be at least 8 characters.']
    }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.confirmPassword == '') {
        this.invalidate('confirmPassword', 'Confirm Password required.');
    }
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
