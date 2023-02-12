const client = require("../models/database")
const studentInfo = require("./student_info")

async function dropCourse(req) {
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // const tstamp = "2010-04-01 14:59:30";
    const currSemQuery = await client.query(
        "\
            select * from reg_dates\
            where start_time<='"+tstamp+"'\
            order by start_time DESC\
            limit 1\
        "
    )
    if(currSemQuery.rows.length!=1)
    {
        return {error:"couldnt resolve current semester"}
    }

    const yr = currSemQuery.rows[0].year
    const sem = currSemQuery.rows[0].semester
    const resp = await client.query("delete from takes where course_id = '"+req.body.data+"' and year = "+yr+" and semester='"+sem+"' and id = '"+req.session.userid+"'")
    return studentInfo(req.session.userid)
}

module.exports = dropCourse