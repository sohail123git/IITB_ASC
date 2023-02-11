const validateToken = (req, res, next) => {
    console.log("validation")
    // console.log(req.session)
    if(!req.session.authorized)
        return res.json(
            {err: "User not logged in! Redirecting to login page...."}
        )

    return next()
    // try {
    //     const validToken = verify(accessToken, "RANDOMSTRING")
    //     req.user = validToken
    //     if(validToken){
    //     }
    // } catch (err) {
    //     if(!accessToken) return res.json({error: err})   
    // }
}

module.exports = {validateToken}
3