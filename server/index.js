const express = require("express")
// const cookieParser = require("cookie-parser");
const app = express()
const loginRouter = require("./routes/login")
const homeRouter = require("./routes/home")
const dropRouter = require("./routes/drop")
const registrationRouter = require("./routes/registration")
const coursesRouter = require("./routes/courses")
const InstructorsRouter = require("./routes/instructors")
const session = require('express-session');


app.use(express.json());       // to support JSON-encoded bodies
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { 
      maxAge: oneDay
    },
    resave: false 
})); 
// app.use(cookieParser());

var cors = require("cors")
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(cors({origin: "http://localhost:3000", credentials: true})) 
app.use("/login/", loginRouter)
app.use("/home/",homeRouter)
app.use("/drop/",dropRouter)
app.use("/registration",registrationRouter)
app.use("/course",coursesRouter) 
app.use("/instructors",InstructorsRouter)


// app.get('/', (req,res)=>{
//   res.send("hello");
// });

app.listen(5000, ()=>{
    console.log("Server Is Listening On Port 5000")
})