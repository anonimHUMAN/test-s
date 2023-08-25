// const { title } = require('process')
const Teacher = require('../models/User')
const bcrypt = require("bcryptjs")


exports.index = async (req, res) => {
    let data = await Teacher.find({ role: "teacher" }, ["firstName", "lastName", "email", "subject", "phone", "password", "role", "group"])
    if (data) {
        res.json({ title: 'All teacher', data: data })
    }
}

exports.show = async (req, res) => {
    if (req.user.role === "teacher") {
        let data = await Teacher.findById({ _id: req.user.id }, ["firstName", "lastName", "email", "subject", "phone", "password",])
        if (data) {
            res.json({ title: 'Special teacher', data: data })
        }
    } else if (req.user.role === "admin") {
        let data = await Teacher.findById({ _id: req.params.id }, ["firstName", "lastName", "email", "subject", "phone", "password", "group"])
        if (data) {
            res.json({ title: 'Special teacher', data: data })
        }
    }
}

exports.create = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body;
    try {
        if (firstName && lastName && email && subject && phone && password) {
        let DATA = await Teacher.findOne({ email: req.body.email})
        if(DATA){
            res.json({title: "Bunday email mavjud"})
        }
        else{

            let teacher = new Teacher({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                subject: req.body.subject,
                phone: req.body.phone,
                password: req.body.password,
                role: "teacher"
            })
            const hash = await bcrypt.hash(teacher.password, 12)
            teacher.password = hash
            teacher.save()
                .then(async data => {
                    if (data) {
                        res.json({ title: 'Teacher created', data: data })
                    }
                })
        }

        }
        else {
            res.json({ title: 'Ma`lumot toliq emas' })
        }
    }
    catch (err) {
        res.json({ err })
    }
}

exports.remove = async (req, res) => {
    let data = await Teacher.findByIdAndDelete(req.params.id)
    if (data) {
        res.json({ title: 'Teacher removed', data: data })
    }
}

exports.update = async (req, res) => {
    let { firstName, lastName, email, subject, phone, password } = req.body;
    if (firstName || lastName || email || subject || phone || password) {
        const hash = await bcrypt.hash(password, 12)
        password = hash
        req.body.password = password
        let data = await Teacher.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: 'Teacher edited', data: data })
        }
    }
    else {
        res.json({ title: 'Ma`lumot yo`q' })
    }
}
