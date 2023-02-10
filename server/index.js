const express = require("express")
const app = express()
const loginRouter = require("./routes/login")
const homeRouter = require("./routes/home")
const dropRouter = require("./routes/drop")
const registrationRouter = require("./routes/registration")
const coursesRouter = require("./routes/courses")
const InstructorsRouter = require("./routes/instructors")

var cors = require("cors")
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(cors()) 
app.use("/login/", loginRouter)
app.use("/home/",homeRouter)
app.use("/drop/",dropRouter)
app.use("/registration",registrationRouter)
app.use("/courses",coursesRouter)
app.use("/instructors",InstructorsRouter)
app.listen(5000, ()=>{
    console.log("Server Is Listening On Port 5000")
})