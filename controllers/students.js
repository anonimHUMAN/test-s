const Student = require('../models/User')
const Teacher = require('../models/User')
const bcrypt = require("bcryptjs")


exports.index = async (req, res) => {
    let data = await Student.find({ role: 'student' }, ["firstName", "lastName", "email", "phone", "parentsPhone", "password", "role", "attendance"])
    if (data) {
        res.json({ title: 'All student', data: data })
    }
}

exports.show = async (req, res) => { 
    if(req.user.role=="student"){
        let data = await Student.findById(req.user.id)
        if (data) {
            res.json({ title: 'Special student', data: data })
        }else{
            res.json({title: `Data is not defined`})
        }

    }else{
        let data = await Student.findById(req.params.id)
        if (data) {
            res.json({ title: 'Special student', data: data })
        }else{
            res.json({title: `Data is not defined`})
        }
    }
}

exports.create = async (req, res) => {
    let { firstName, lastName, email, phone, parentsPhone, password } = req.body;

    try {
        if (firstName && lastName && email && phone && parentsPhone && password) {
            let DATA = await Student.findOne({ email: req.body.email })
            if (DATA) {
                res.json({ title: "Bunday email mavjud" })
            }
            else {
                let student = new Student({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    parentsPhone: req.body.parentsPhone,
                    password: req.body.password,
                    role: "student"
                })
                const hash = await bcrypt.hash(student.password, 12)
                student.password = hash
                student.save()
                    .then(async data => {
                        if (data) {
                            res.json({ title: 'Student created', data: data })
                        }
                    })
            }
        }
        else {
            res.json({ title: 'Ma`lumot toliq emas' })
        }
    } catch (err) {
        res.json({ dsc: err })
    }
}

exports.remove = async (req, res) => {
    let data = await Student.findByIdAndDelete(req.params.id)
    if (data) {
        let student = await Student.find({
            group: {
                $elemMatch: {
                    students: {
                        $in: [req.params.id]
                    }
                }
            }
        })
    
        for (let i = 0; i < student[0].group.length; i++) {
            let student=await Student.findOneAndUpdate({
                group:{
                    $elemMatch:{
                        students:{
                            $in:[req.params.id]
                        }
                    } 
                }
            },{
                $pull: {
                    "group.$.students": req.params.id  
                }
            }
            )
        }
        res.json({ title: 'Student removed', data: data })
    }

}

exports.update = async (req, res) => {
    let { firstName, lastName, email, phone, parentsPhone, password } = req.body;
  
    if (firstName || lastName || email || phone || parentsPhone || password) {
        const hash = await bcrypt.hash(password, 12)
        password = hash
        req.body.password = password
        let data = await Student.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            res.json({ title: 'Student edited', data: data })
        }
    }
    else {
        res.json({ title: 'Ma`lumot yo`q' })
    }
}

exports.addStudentToGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.body
    if (idTeacher && idGroup && idStudent) {
        let teacher = await Teacher.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found" })
        } else {
            let student = await Teacher.findById(idTeacher, { group: { $elemMatch: { _id: idGroup } } })
            let qwe = student.group[0].students.filter(elem => elem == idStudent)
            if (qwe.length > 0) {
                res.json({ title: "Bunday oquvchi allaqachon mavjud" })

            } else {
                let group = await Teacher.findOneAndUpdate(
                    {
                        _id: idTeacher,
                        "group._id": idGroup
                    },
                    {
                        $push: {
                            "group.$.students": idStudent
                        }
                    })

                res.json({ title: "Success", group })

            }

            // res.json({ title: "Success", student })

        }
    } else {
        res.json({ title: "Data is not defined" })
    }

}

exports.removeStudentFromGroup = async (req, res) => {
    let { idTeacher, idGroup, idStudent } = req.body
    if (idTeacher && idGroup && idStudent) {
        let teacher = await Teacher.findById(idTeacher)
        if (!teacher) {
            res.json({ title: "Teacher not found" })
        } else {
            let group = await Teacher.findOneAndUpdate(
                {
                    _id: idTeacher,
                    "group._id": idGroup
                },
                {
                    $pull: {
                        "group.$.students": idStudent  
                    }
                })

            res.json({ title: "Success", group })

        }


    } else {
        res.json({ title: "Data is not defined" })
    }


}


