const client = require("../models/database")

async function InstructorQuery(req) {
    const info = await client.query("select * from instructor where ID = '"+req.body.ID+"'")
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const currSemQuery = await client.query(
        "\
            select * from reg_dates\
            where start_time<='"+tstamp+"'\
            order by start_time DESC\
            limit 1\
        "
    )
    
    // console.log(currSemQuery.rows)
    if(currSemQuery.rows.length!=1)
    {
        return {error:"couldnt resolve current semester"}
    }
    const semstart=currSemQuery.rows[0].start_time.slice(0, 19).replace('T', ' ');
    
    const CurrentCourses = await client.query(
        "select course.title,teaches.course_id, teaches.year, teaches.semester from "+
        "teaches,course "+
        "where teaches.ID = '"+req.body.ID+"' and course.course_id = teaches.course_id and "+
        "teaches.semester = '"+currSemQuery.rows[0].semester+
        "' and teaches.year = "+currSemQuery.rows[0].year+
        " order by teaches.course_id"
    )
    const CoursesTaught = await client.query(
        "select course.title,teaches.course_id, teaches.year, teaches.semester from "+
        "teaches,course,reg_dates "+
        "where teaches.ID = '"+req.body.ID+"' and course.course_id = teaches.course_id and "+
        "teaches.semester = reg_dates.semester and teaches.year = reg_dates.year and "+
        "start_time<'"+semstart+"' "+
        "order by reg_dates.start_time desc"
    )
    if(info.rows.length!=0){
        return {info:info.rows[0],CoursesTaught:CoursesTaught.rows,CurrentCourses:CurrentCourses.rows}
    }
    else{
        return {error:"Instructor does not exist"}
    }
}

module.exports = InstructorQuery