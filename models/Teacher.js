const {model, Schema} = require('mongoose')

module.exports = model('Teacher', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    password: String,
    subject: String,
    status: {
        type: String,
        default: "teacher"
    },
    group: [
        {
           title: String,
           day: {
            type: String,
            enum: ["toq", "juft"],
            default: 'toq'
           },
           time: {
            type: String,
            require: true
           },
           students: [{
           type:  Schema.Types.ObjectId,
           ref: "Student"
        }] 
        }
    ]

},{timestamps: true}))