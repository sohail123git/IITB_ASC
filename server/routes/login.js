const express = require("express");
const {Client} = require("pg")
const router = express.Router();
const {sign} = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const LoginQuery = require("../services/LoginQuery")


// var session;

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
      bcrypt.compare(req.body.Password, hashed_password, function(err, result) {
        result == true
        if(result){
          // const accessToken = sign({ID:ID, Username:req.body.ID},"RANDOMSTRING")
          // res.json(accessToken)
          // session=req.session;
          req.session.authorized = true;
          req.session.userid = req.body.ID;
          res.json(req.session)
        }
        else{
          res.json({error: "Invalid user"}) 
        }

      });
    }
})

router.get('/logout', async (req,res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router