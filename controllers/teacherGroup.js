const Teacher = require('../models/User')
const Student = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.index = async (req, res) => {
    let { idTeacher } = req.query
    if (!idTeacher) {
        res.json({ title: "Enter Teacher's id!" })
    } else {
        let data = await Teacher.findById(idTeacher, ['group'])
        if (data) {
            res.json({ title: 'Teacher`s all group', data: data })
        }
    }
}
exports.showGroup = async (req, res) => {   
    let { idTeacher } = req.query
    if (!idTeacher) {
        res.json({ title: "Enter Teacher's id!" })
    } else {

        const data = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
        if (data) {
            res.json({ title: 'Special group', data: data })
        }
        else {
            res.json({ title: 'Xato' })
        }
    }
}

exports.showProfile = async (req, res) => {
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

    exports.update = async (req, res) => {
        let { email, password } = req.body;
        if (email || password) {
            const hash = await bcrypt.hash(password, 12)
        password = hash
        req.body.password = password
            let data = await Teacher.findByIdAndUpdate(req.user.id, req.body)
            if (data) {
                res.json({ title: 'Teacher edited', data: data })
            }
        }
        else {
            res.json({ title: 'Ma`lumot yo`q' })
        }
    }

    exports.getStudents = async (req, res) => {
        let data = await Student.find({ role: 'student' }, ["firstName", "lastName", "email", "phone", "parentsPhone", "password", "role", "attendance"])
        if (data) {
            res.json({ title: 'All student', data: data })
        }
    }
