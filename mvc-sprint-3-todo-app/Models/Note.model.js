const mongoose = require("mongoose")


const TodoItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})
const noteModel = mongoose.model('todo', TodoItemSchema);

module.exports = { noteModel }
