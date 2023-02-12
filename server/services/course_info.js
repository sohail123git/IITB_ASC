const client = require("../models/database")

async function CourseInfoQuery(req) {
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
    console.log("in query")
    const courseInfo = await client.query("select * from course where course.course_id = '"+req.body.ID+"'")
    if(courseInfo.rows.length==0)
    return {error:"Course doesnt exist"}
    
    const prereqInfo = await client.query("select prereq_id, title as name from course,prereq where prereq.course_id = course.course_id and course.course_id = '"+req.body.ID+"'")
    const InstructorsInfo = await client.query("select instructor.id,name from instructor,teaches "+
    "where instructor.id = teaches.id and teaches.year="+currSemQuery.rows[0].year+
    " and teaches.semester='"+currSemQuery.rows[0].semester+
    "' and course_id = '"+req.body.ID+"'")
    
    console.log("query done")
    return {courseInfo:courseInfo.rows[0],prereqInfo:prereqInfo.rows,InstructorsInfo:InstructorsInfo.rows}
}

module.exports = CourseInfoQuery
