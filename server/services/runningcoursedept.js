const client = require("../models/database")

async function RunningCourseDeptQuery(req) {
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


    RunningCourses = await client.query(
        "select course.course_id as id, title as name from "+
        "course,teaches where course.course_id=teaches.course_id and "+
        "teaches.year="+currSemQuery.rows[0].year+" and teaches.semester ='"+currSemQuery.rows[0].semester+"'"+
        "and course.dept_name = '"+req.body.dept+"'"
    )
    return {RunningCourses:RunningCourses.rows}
}

module.exports = RunningCourseDeptQuery