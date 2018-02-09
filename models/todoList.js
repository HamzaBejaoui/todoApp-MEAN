const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
    title:{
        type:String
    },
    desc:{
        type:String
    },
    Date:{
        type: Date,
        default:Date.now()
    },
    done:{
        type:Boolean
    },
    createdBy:{
        type: String
    }

});


module.exports = mongoose.model('TodoList', TodoListSchema);