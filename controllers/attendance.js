const Student = require('../models/User')

exports.index = async (req, res) => {
    let { idStudent } = req.query
    let data = await Student.findById(idStudent, ['attendance', "firstName", "lastName"])
    if (data) {
        res.json({ title: 'Student`s all attendance', data: data })
    }
}


exports.create = async (req, res) => {
    try{ 
        if (req.body.data) {
        let next1 = false
            let student = await Student.findById(req.body.data[0]._id, {})
            if(student.attendance.length>0){
                        let date1 = new Date(student.attendance[student.attendance?.length-1]?.date).toString()
                        let date2= new Date(req.body.data[0]?.date).toString()
                        next1=date1===date2
            }else{
                next1=false
            }
        if (!next1) {
            req.body.data.map(async item => {
                let student = await Student.findByIdAndUpdate(item._id, {
                    $push: {
                        attendance: {
                            absend: item.absend,
                            date: item.date,
                            score: item.score
                        }
                    }
                })
            })
            res.json({ message: "Success" })
        } else {
            res.json({ title: "Error", message: "You are already add attendance to students" })
        }
    }
    } catch(e){
        console.log(e);
    }
}

// exports.create = async (req, res) => {
//     if (req.body.data) {
//         let next1 = false
//         for (let i = 0; i < req.body.data.length; i++) {
//             let student = await Student.findById(req.body.data[i]._id, {})
//             if (student.attendance[0]) {
//                 next1 = student.attendance[student.attendance.length - 1].date === req.body.data[0].date
//             }
//         }
//         if (!next1) {
//             req.body.data.map(async item => {
//                 let student = await Student.findByIdAndUpdate(item._id, {
//                     $push: {
//                         attendance: {
//                             absend: item.absend,
//                             date: item.date,
//                             score: item.score
//                         }
//                     }
//                 })
//             })
//             res.json({ message: "Success" })
//         } else {
//             res.json({ title: "Error", message: "You are already add attendance to students" })
//         }
//     }
// }

exports.remove = async (req, res) => {
    if (req.query.idStudent && req.query.idAttendance) {
        const data = await Student.findByIdAndUpdate(req.query.idStudent, {
            $pull: { attendance: { _id: req.query.idAttendance } }
        })
        if (data) {
            res.json({ title: 'Attendance deleted', data })
        }
    } else {
        res.json({ title: "Error", desc: "Bunday talaba mavjud emas" })
    }
}

exports.update = async (req, res) => {
    const { status, date, reason, score } = req.body;
    if (req.query.idStudent && req.query.idAttendance) {
        if (status || date || reason || score) {
            const data = await Student.findOneAndUpdate(
                {
                    _id: req.query.idStudent,
                    "attendance._id": req.query.idAttendance
                },
                {
                    $set: {
                        "attendance.$": { ...req.body, _id: req.query.idAttendance }
                    }
                })
            if (data) {
                res.json({ title: 'Attendance updated', data })
            } else {
                res.json({ title: 'Xatolik' })
            }
        }
    }
}



