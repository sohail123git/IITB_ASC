const express = require("express");
const {Client} = require("pg")
const router = express.Router();
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/loginMiddleware")
const InstructorsQuery = require("../services/instructors");
const InstructorQuery = require("../services/instructor");


router.post("/", validateToken, async (req,res) => {
    var response = ''
    response = await InstructorsQuery(req)
    res.json(response)
})

router.post("/instructorinfo", validateToken, async (req,res) => {
    var response = ''
    response = await InstructorQuery(req)
    res.json(response)
})

module.exports = router