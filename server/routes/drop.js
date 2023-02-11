const express = require("express");
const {Client} = require("pg")
const router = express.Router();
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/loginMiddleware")
const  dropCourse = require("../services/dropCourse");


router.post("/", validateToken, async (req,res) => {
    var response = ''
    response = await dropCourse(req)
    res.json({info:response.info[0],prevCourses:response.prevCourses,regdCourses:response.regdCourses})
})

module.exports = router