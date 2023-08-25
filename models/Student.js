const { model, Schema } = require('mongoose')

module.exports = model('Student', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    parentsPhone: {
        mother: Number,
        father: Number,
    },
    password: String,
    totalScore: Number,
    attendance: [
        {
            absend: {
                type: Boolean,
                default: false
            },
            date: {
                type: Date,
                default: Date.now()
            },
            score: {
                type: Number,
                default: 0
            }
        }
    ]

}, { timestamps: true }))