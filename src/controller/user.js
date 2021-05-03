const User = require("../models/user");

module.exports.signUp = (req, res) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
    const user = new User(userData);
    user.save().then((_user) => {
        console.log(_user)
        res.json({_user})
    }).catch((err) => {
        console.log(err)
        res.json({err})
    })
}
