// const { title } = require('process')
const Teacher = require('../models/User')

exports.index = async (req, res) => {
    if (req.user.role == "admin") {
        let { idTeacher } = req.query
        let data = await Teacher.findById(idTeacher, ['group'])
        if (data) {
            res.json({ title: 'Teacher`s all group', data: data })
        }
    } else if (req.user.role == 'teacher') { 
        let idTeacher = req.user.id
        let data = await Teacher.findById(idTeacher, ['group'])
        if (data) {
            res.json({ title: 'Teacher`s all group', data: data })
        }
    }
}

exports.show = async (req, res) => {
    if(req.user.role == "admin"){
        const data = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.params.id } } })
        if (data) {
            let students = await Teacher.find({_id:{$in:data.group[0].students}})
            data.group[0].students = students
            res.json({ title: 'Special group', data: data })
        }
        else {
            res.json({ title: 'Xato' })
        }
    } else if(req.user.role == "teacher"){
        const data = await Teacher.findById(req.user.id).select({ group: { $elemMatch: { _id: req.params.id } } })
        if (data) {
            let students = await Teacher.find({_id:{$in:data.group[0].students}})
            data.group[0].students = students
            res.json({ title: 'Special group', data: data })
        }
        else {
            res.json({ title: 'Xato' })
        }
    }
}

exports.create = async (req, res) => {
    let { title, day, time } = req.body;
    let { idTeacher } = req.query;
    try {
        let idTeacherCheck = await Teacher.findById(idTeacher)
        if (title && day && time) {
            const data = await Teacher.findByIdAndUpdate(idTeacher, { $push: { group: req.body } })
            if (data) {
                res.json({ title: 'Group added to Teacher', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        } else {
            res.json({ title: 'Ma`lumot toliq emas' })
        }
    }
    catch (e) {
        res.json({ title: 'Error', e })
    }

}

exports.remove = async (req, res) => {
    if (req.query.idTeacher && req.query.idGroup) {
        const data = await Teacher.findByIdAndUpdate(req.query.idTeacher, {
            $pull: { group: { _id: req.query.idGroup } }
        })
        if (data) {
            res.json({ title: 'Group deleted', data })
        }
    } else {
        res.json({ title: "Error", desc: "Bunday oqituvchi mavjud emas" })
    }
}

exports.update = async (req, res) => {
    const { title, day, time } = req.body;
    if (req.user.role == "admin") {
    if (req.query.idTeacher && req.query.idGroup) {
        if (title || day || time) {
            const qwe = await Teacher.findById(req.query.idTeacher).select({ group: { $elemMatch: { _id: req.query.idGroup } } })
            let group = {
                _id: qwe.group[0]._id,
                title: qwe.group[0].title,
                day: qwe.group[0].day,
                time: qwe.group[0].time,
                students: qwe.group[0].students,
                ...req.body
            };
            const data = await Teacher.findOneAndUpdate(
                {
                    _id: req.query.idTeacher,
                    "group._id": req.query.idGroup
                },
                {
                    $set: {
                        "group.$": group
                    }
                })

            if (data) {
                res.json({ title: 'Group updated', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        }
    }
}else if (req.user.role == "teacher") {
    if (req.user.id && req.query.idGroup) {
        if (title || day || time) {
            const qwe = await Teacher.findById(req.user.id).select({ group: { $elemMatch: { _id: req.query.idGroup } } })
            let group = {
                _id: qwe.group[0]._id,
                title: qwe.group[0].title,
                day: qwe.group[0].day,
                time: qwe.group[0].time,
                students: qwe.group[0].students,
                ...req.body
            };
            const data = await Teacher.findOneAndUpdate(
                {
                    _id: req.user.id,
                    "group._id": req.query.idGroup
                },
                {
                    $set: {
                        "group.$": group
                    }
                })

            if (data) {
                res.json({ title: 'Group updated', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        }
    }
}
}

