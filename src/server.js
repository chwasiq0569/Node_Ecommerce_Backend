const express = require('express');

const app = express()

app.get("/", (req, res) => {
    res.json({'msg': 'WELCOME'})
})

app.listen(4000, () => {
    console.log("WOEKGIN ON PORT 4000")
})