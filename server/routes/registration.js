const express = require("express");
const {Client} = require("pg")
const router = express.Router();
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/loginMiddleware")
const registerCourse = require("../services/registerCourse");
const CoursesQuery = require("../services/courses");


router.post("/", validateToken, async (req,res) => {
    var response = ''
    response = await CoursesQuery(req)
    res.json(response)
})

router.post("/register", validateToken, async (req,res) => {
    var response = ''
    response = await registerCourse(req)
    res.json(response)
})

module.exports = router