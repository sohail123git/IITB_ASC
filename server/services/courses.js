const client = require("../models/database")

async function CoursesQuery(req) {
    const Courses = await client.query("select course_id as id, title as name from course")
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("coursses!!")
    RunningCourses = await client.query(
        "select course.course_id as id, title as name from "+
        "course,teaches,reg_dates where course.course_id=teaches.course_id and "+
        "teaches.year=reg_dates.year and teaches.semester = reg_dates.semester and "+
        "start_time <='"+tstamp+"' and end_time>'"+tstamp+"'"
    )
    return {Courses:Courses.rows,RunningCourses:RunningCourses.rows}
}

module.exports = CoursesQuery