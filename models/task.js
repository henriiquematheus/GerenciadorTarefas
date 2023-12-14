//models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   descricao: {
       type: String,
       required: true,
       trim: true
   },
   completada: {
       type: Boolean,
       default: false
   },
   owner: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'
   },
   list: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'List'
   }
}, {
   timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
