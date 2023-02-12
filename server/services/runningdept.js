const client = require("../models/database")

async function RunningDeptQuery(req) {

    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
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

    const Departments = await client.query(
        "select distinct dept_name from course,teaches "+
        "where course.course_id = teaches.course_id and teaches.year = "+currSemQuery.rows[0].year+
        " and teaches.semester = '"+currSemQuery.rows[0].semester+"'"
    )
    return {Departments: Departments.rows}
}

module.exports = RunningDeptQuery