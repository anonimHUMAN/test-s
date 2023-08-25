const Admin = require('../models/User')
const bcrypt = require("bcryptjs")

exports.index = async (req, res) => {
    let data = await Admin.find({ role: "admin" }, ["firstName"])
    if (data) {
        res.json({ title: 'All admins', data: data })
    }
}

exports.create = async (req,res)=>{
    if(req.headers.password===process.env.password){
        let {email, password, firstName} = req.body

        if(!email || !password){
            res.json({title: "Email or password no present"}) 
        }
        else if(!firstName){
            res.json({title: "Please enter your name!"}) 
        }
        else{
            let admin = new Admin({
                firstName: req.body.firstName,
                email: req.body.email,
                password: req.body.password,
                role: "admin"
            })
            const hash = await bcrypt.hash(admin.password, 12)
            admin.password = hash
            admin.save()
                .then(async data => {
                    if (data) {
                        res.json({ title: 'Admin created', data: data })
                    }
                })
        }
    }
    else{
        res.json({title: "😢☹😩"})
    }
}