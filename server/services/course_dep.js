const client = require("../models/database")

async function CourseDepQuery(req) {
    const depCourses = await client.query("select course_id, title from course where course.dept_name ='"+req.body.dept_name+"'")
    if(depCourses.rows!=0)    
    {
        return depCourses.rows
    }
    return {error:"This department has no courses"}
}

module.exports = CourseDepQuery
