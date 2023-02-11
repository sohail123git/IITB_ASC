const express = require("express");
const {Client} = require("pg")
const router = express.Router();
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/loginMiddleware")
const studentInfo = require("../services/student_info");


router.post("/", validateToken, async (req,res) => {
    console.log("home")
    var response = ''
    response = await studentInfo(req.session.userid)
    
    // console.log(response)
    res.json({info:response.info[0],prevCourses:response.prevCourses,regdCourses:response.regdCourses})
})

module.exports = router