const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


exports.login = async (req, res, next) => {
    // console.log("salom")
    const { email, password } = req.body
    // Check if email and password is provided
    if (!email || !password) {
        return res.json({
            message: "Email or Password not present",
        })
    }else{

        try {
            const user = await User.findOne({ email })
            if (!user) {
                res.json({
                    message: "Login not successful",
                    error: "User not found",
                })
            } else {
                // comparing given password with hashed password
                let isValid = await bcrypt.compare(password, user.password)
                if (!isValid) {
                    res.status(200).json({ message: "Login not successful" })
    
                } else {
                    let payload = {
                        id: user.id,
                        role: user.role
                    }
                    const token = await jwt.sign(payload, process.env.jwt_key, { expiresIn: '2h' })
                    res.status(200).json({
                        message: "Login successful",
                        token,
                        role:user.role
                    })
                }
            }
            next()
        } catch (error) {
            res.json({
                message: "An error occurred",
                error: error.message,
            })
        }
    }
}


