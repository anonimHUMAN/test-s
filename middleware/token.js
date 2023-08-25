const jwt = require("jsonwebtoken")

exports.token = async (req, res, next) => {
    let token = req.params.token || req.headers.authorization
    if (!token) {
        res.json({ title: "Error", message: "Token is not defined" })
    }
    else {
        try {
            let decoded = await jwt.verify(token, process.env.jwt_key)
            let user = {}
            user.id = decoded.id
            user.role = decoded.role
            req.user = user
            next()
        }
        catch (err) {
            res.json({
                title: "Error", message: "Token wrong!"
            })
        }
    }
}