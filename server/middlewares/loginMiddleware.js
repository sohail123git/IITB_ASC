const {verify} = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    console.log("here")
    const accessToken = req.body.headers.accessToken
    if(!accessToken) return res.json({err: "User not logged in! Redirecting to login page...."})

    try {
        const validToken = verify(accessToken, "RANDOMSTRING")
        req.user = validToken
        if(validToken){
            return next()
        }
    } catch (err) {
        if(!accessToken) return res.json({error: err})   
    }
}

module.exports = {validateToken}