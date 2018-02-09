const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    job: {
        type: String
    }
});


UserSchema.pre('save', function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    //Generate Salt Value
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        //Use this salt value to hash password
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });

    });

});

//Custom method to check the password correct when login
UserSchema.methods.isPasswordMatch = function (plainPassword, hashed, callback) {
    bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
        if (err) {
            next(err);
        }
        callback(null, isMatch);
    });
}



module.exports = mongoose.model('User', UserSchema);