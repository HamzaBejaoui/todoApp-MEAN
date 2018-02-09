const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const passport = require('passport'); 
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const UserRoutes = require('./routes/users');
const TodoLists = require('./routes/todoLists');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoAppFP');
mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});
mongoose.connection.on('error', (err) => {
    console.log('Unable to connect to the database ' + err);
});




app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);



app.use(express.static(path.join(__dirname, 'dist')));


// const connection = (closure) => {
//     return MongoClient.connect('mongodb://localhost:27017/AppDb', (err, client) => {
//         if (err) return console.log(err);
//         let db = client.db('AppDb');
//         closure(db);
//     });
// };

// app.get('/', (req, res) => {
//     connection((db) => {
//         db.collection('pool').find().toArray((err, data) => {
//             res.send(data);
//         });
//     });
// });

app.get('/', (req, res) => {
    res.send('yes ')
    // res.send({
    //     dataReceived: req.body
    // });
    // connection(db => {
    //     db.collection('pool').insertOne(req.body, (err, result) => {
    //         res.send(result);
    //     })
    // })
});

app.use('/users', UserRoutes);
app.use('/todo', TodoLists);


console.log('listen on port 3000');
app.listen(3000);