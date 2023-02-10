const client = require("../models/database")

async function CourseInfoQuery(req) {
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const courseInfo = await client.query("select * from course where course.course_id = '"+req.body.ID+"'")
    const prereqInfo = await client.query("select prereq_id from course,prereq where prereq.course_id = course.course_id and course.course_id = '"+req.body.ID+"'")
    const InstructorsInfo = await client.query("select instructor.id,name from instructor,teaches,reg_dates "+
    "where instructor.id = teaches.id and reg_dates.year = teaches.year and reg_dates.semester = teaches.semester and start_time<'2023-02-05 18:00:00' and end_time>'2022-02-05 18:00:00'"+
    "and course_id = '"+req.body.ID+"'")
    if(courseInfo.rows.length!=0)
        return {courseInfo:courseInfo.rows[0],prereqInfo:prereqInfo.rows,InstructorsInfo:InstructorsInfo.rows}
    else
        return {error:"Course doesnt exist"}
}

module.exports = CourseInfoQuery
