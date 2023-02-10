const client = require("../models/database")

async function RunningCourseDeptQuery(req) {
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    RunningCourses = await client.query(
        "select course.course_id as id, title as name from "+
        "course,teaches,reg_dates where course.course_id=teaches.course_id and "+
        "teaches.year=reg_dates.year and teaches.semester = reg_dates.semester and "+
        "start_time <='"+tstamp+"' and end_time>'"+tstamp+"' and course.dept_name = '"+
        req.body.dept+"'"
    )
    return {RunningCourses:RunningCourses.rows}
}

module.exports = RunningCourseDeptQuery