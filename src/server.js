const express = require('express');
const userRoutes = require('./router/user')
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const app = express()
app.use(express.json())
dotenv.config();

mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zq4mb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
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