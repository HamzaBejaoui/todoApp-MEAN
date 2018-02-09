const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');


router.post('/register', (req, res) => {
        // console.log("req.body", req.body);
        let newUser = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            job: req.body.job
        });
        // console.log("newUser", newUser);
        newUser.save((err, user) => {
            if (err) {
                res.json({ success: false, msg: err });
            } else {
                res.json({ success: true, msg: "user added succeffully", user });
            }
        });
   
});




router.post('/login', (req, res) => {
    const password = req.body.password;
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error, please try again'
            });
        }

        if (!user) {
            return res.send({
                success: false,
                message: 'Error, Account not found'
            });
        }

        user.isPasswordMatch(password, user.password, (err, isMatch) => {
            console.log(password);
            if (!isMatch) {
                return res.send({
                    success: false,
                    message: 'Error, Invalid Password'
                });
            }
            const token = jwt.sign({ user }, "SECRET", { expiresIn: 604800 });

            let returnUser = {
                name: user.name,
                email: user.email,
                id: user._id
            }

            return res.send({
                success: true,
                message: 'You can login now',
                user: returnUser,
                token
            });

        });
    });
});


















module.exports = router;