const {model, Schema} = require('mongoose')

module.exports = model('User', new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String, 
        require: true, 
        
    },
    phone: Number,
    password: {
        type: String,
        require: true
    },
    subject: String,
    role: {
        type: String,
        enum: ["admin", "teacher", "student"],
        default: "student"
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
           ref: "User"
        }] 
        }
    ],
    parentsPhone: {
        mother: Number,
        father: Number,
    },
    totalScore: Number,
    attendance: [
        {
            absend: {
                type: Boolean,
                default: false
            },
            date: {
                type: String,
                default: Date.now()
            },
            score: {
                type: Number,
                default: 0
            }
        }
    ]
 

},{timestamps: true})) 