const Student = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.group = async (req, res) => {
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
    res.json({ title: 'Succes' })

   



    // res.json(student[0].group.length); 
}
// }
// let show = student._id
// let group = student.group.find(item=>{
//     return item.students.find(elem=>elem==req.user.id)
// })
// let group = await Student.aggregate([
//     {$unwind:"$group"},
//     {$match:{"group.students":req.user.id}},
//     {$lookup:{
//         from:"ucers",
//         localField:"group.students",
//         foreignField:"_id",
//         as:"group.students"
//     }}
// ])
// res.json(student[0].group.$.students);

// }

exports.totalScore = async (req, res) => {
    let { idTeacher, idGroup } = req.query
    try {
        if (idTeacher && idGroup) {
            const data = await Student.findById(idTeacher).select({ group: { $elemMatch: { _id: idGroup } } })
            data.group[0].students.map(async (item, i) => {
                let t = await Student.findById(item)
                let totalS1 = t.attendance[0].score + t.attendance[0].score
                let newT = totalS1 / t.attendance.length
                newT = Math.floor(newT)
                let data1 = await Student.findByIdAndUpdate(item, { totalScore: newT })
            })
            res.json({ title: "Success" })
        } else {
            res.json({ title: "idTeacher or idGroup not found" })
        }
    } catch (e) {
        res.json({ title: "ERROR: ", e })
    }
}

exports.update = async (req, res) => {
    let { email, password } = req.body;
    if (email || password) {
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

exports.getScore = async (req, res) => {
    let data = await Student.find({ role: "student" }).sort({ 'attendance.score': -1 }).limit(3)
    // let data = Student.collection.aggregate(
    // {
    //     $match: {
    //         role : "student"
    //     }
    // },
    // {
    //     $unwind : '$attendance'
    // },
    // {
    //     $sort:{
    //         'attendance.score': -1
    //     }
    // }

    //   [  {$set:{

    //       attendance:{
    //           $sortArray: {
    //               input: '$score',
    //               sortBy: {score: -1}
    //             }
    //         }

    //     }}]
    // )
    res.json(data)
}