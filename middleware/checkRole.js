exports.checkAdmin = async (req, res, next) => {
    if (req.user.role === "admin") {
        next()
    } else {
        res.json({ title: "error", message: "No authorization on this role" })
    }
}

exports.checkTeacher = async (req, res, next) => {
    if (req.user.role === "teacher" || req.user.role === "admin") {
        next()
    } else {
        res.json({ title: "error", message: "No authorization on this role" })
    }
}

exports.checkStudent = async (req, res, next) => {
    if (req.user.role === "student" || req.user.role === "admin") {
        next()
    } else {
        res.json({ title: "error", message: "No authorization on this role" })
    }
}