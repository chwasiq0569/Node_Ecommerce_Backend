const express = require('express');
const userRoutes = require('./router/user')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://admin:admin@cluster0.zq4mb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("DB CONNECTED")).catch((err) => console.log("Error: ", err))

app.use('/api', userRoutes)

app.get("/", (req, res) => {
    res.json({'msg': 'WELCOME'})
})

app.listen(4000, () => {
    console.log("WORKGING ON PORT 4000")
})