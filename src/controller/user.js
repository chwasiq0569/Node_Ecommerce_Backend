const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

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

module.exports.signIn = async (req, res) => {
    const userExists = await User.findOne( {email: req.body.email} );
    if(userExists){
        const {_id, name, email, role} = userExists

        const passwordMatched = bcrypt.compare(req.body.password, userExists.password);
        if(passwordMatched){
           return res.status(201).json({
                token: jwt.sign({ _id, name, email, role }, process.env.JWT_SECURITY_KEY, { expiresIn: '15d' }) ,
                _id, name, email, role
            })
        }
        else{
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }
    }else{
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }
}