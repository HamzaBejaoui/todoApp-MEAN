const express = require('express');
const router = express.Router();
const User = require('../models/user');
const TodoList = require('../models/todoList');
const passport = require('passport');


router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const newTodo = new TodoList({
        title: req.body.title,
        desc: req.body.desc,
        done: req.body.done,
        createdBy: req.body.createdBy
    });
    newTodo.save((err, todo) => {
        if (err) {
            return res.send({
                success: false,
                error: err
            });
        }
        return res.send({
            success: true,
            todo,
            message: 'Task Saved'
        });
    });
});


router.post('/list', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    TodoList.find({ createdBy: req.body.createdBy }, (err, todo) => {
        if (err) {
            return res.send({
                success: false,
                msg: err
            });
        }
        return res.send({
            success: true,
            todo
        });
    });
});


router.post('/list/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    TodoList.find({ createdBy: req.body.createdBy }, (err, todo) => {
        if (err) {
            return res.send({
                success: false,
                msg: err
            });
        }
        let resultat = todo[req.params.id];
        return res.send({
            success: true,
            resultat
        });
    });
});



router.delete('/remove/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    TodoList.remove({ _id: req.params.id }, (err) => {
        if (err) {
            return res.send({
                success: false,
                msg: 'failed to delete', err
            });
        }

        return res.send({
            success: true,
            message: 'Todo deleted'
        });

    });
});




router.put('/updateTodo/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    TodoList.findOne({ _id: req.params.id }, (err, todo) => {
        if (err) {
            return res.send({
                success: false,
                msg: err
            });
        }
        todo.title = req.body.title;
        todo.desc = req.body.desc;
        todo.done = req.body.done;

        todo.save((err) => {
            if (err) {
                return res.send({
                    success: false,
                    msg: err
                });
            }
            return res.send({
                success: true,
                msg: 'Your Todo is updated'
            });
        });
    });


});


module.exports = router;