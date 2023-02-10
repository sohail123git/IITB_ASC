const client = require("../models/database")

async function InstructorsQuery(req) {
    const Instructors = await client.query("select id,name from instructor")
    return Instructors.rows
}

module.exports = InstructorsQuery