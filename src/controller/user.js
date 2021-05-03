const User = require("../models/user");
const bcrypt = require('bcrypt');

module.exports.signUp = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email })
        if(!userExists){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role
            }
            const user = new User(userData);
            user.save().then((_user) => {
                return res.status(201).json({ 
                    message: "User Created Successfully",
                    user: _user
                 })
            }).catch((err) => {
                return res.status(201).json({
                    message: "Something went wrong"
                })
            })
        }else{
            return res.status(400).json({'err': "User Already Exists"})
        }
}

