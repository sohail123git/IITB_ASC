const express = require("express");
const {Client} = require("pg")
const router = express.Router();
const {sign} = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const LoginQuery = require("../services/LoginQuery")

router.get("/", (req,res) => {
    res.send("Server Is Running")
})

router.post("/", async (req,res) => {
    var hashed_password = ''
    var ID = ''
    var err = ''
    var response = ''
    response = await LoginQuery(req)
    if(response.err){
      console.error(err.stack)
    }else if(response.length!=0){
      hashed_password = response[0].hashed_password
      ID = response[0].id
    }
    if (hashed_password === ""){
      res.json({error: "Invalid user"})
    }
    else{
      bcrypt.compare(req.body.Password,hashed_password).then((match) => {
        if(match){
          const accessToken = sign({ID:ID, Username:req.body.ID},"RANDOMSTRING")
          res.json(accessToken)
        }
        else{
          res.json({error: "Invalid user"}) 
        }
      })
    }
})

module.exports = router