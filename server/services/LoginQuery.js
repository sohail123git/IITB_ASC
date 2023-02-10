const client = require("../models/database")

async function LoginQuery(req) {
    const Credentials = await client.query("select * from user_password where id='"+req.body.ID+"'")
    return Credentials.rows
}

module.exports = LoginQuery