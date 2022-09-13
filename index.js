const express = require('express')
const { default: mongoose } = require('mongoose')
const dotenv = require("dotenv")
const {route} = require("./routes/routes")
const cookieParser = require('cookie-parser');

const app = express()

app.use(cookieParser());

dotenv.config({path:"./config/config.env"})
app.use(express.json())

mongoose.connect(process.env.URI,function (err) {
    if(err) throw err
    app.use("/api",route)
    app.listen(process.env.PORT, () => {
        console.log(`Server is Listening on ${process.env.PORT}`)
    }) 
})


