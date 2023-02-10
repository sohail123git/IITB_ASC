const express = require("express");
const {Client} = require("pg")
const router = express.Router();
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/loginMiddleware")
const CoursesQuery = require("../services/courses");
const CourseInfoQuery = require("../services/course_info");
const RunningDeptQuery = require("../services/runningdept");
const RunningCourseDeptQuery = require("../services/runningcoursedept");


router.post("/", validateToken, async (req,res) => {
    var response = ''
    response = await CoursesQuery(req)
    res.json(response)
})

router.post("/courseinfo", validateToken, async (req,res) => {
    var response = ''
    response = await CourseInfoQuery(req)
    res.json(response)
})

router.post("/running", validateToken, async (req,res) => {
    var response = ''
    response = await RunningDeptQuery(req)
    res.json(response)
})

router.post("/coursedept", validateToken, async (req,res) => {
    var response = ''
    response = await RunningCourseDeptQuery(req)
    res.json(response)
})

module.exports = router