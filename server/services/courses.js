const client = require("../models/database")

async function CoursesQuery(req) {
    const Courses = await client.query("select course_id as id, title as name from course")
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

    console.log("courses Query")
    RunningCoursesQuery = await client.query(
        "select course.course_id as id, title as name, sec_id from "+
        "course,section where course.course_id=section.course_id and "+
        "section.year="+currSemQuery.rows[0].year+" and section.semester = '"+currSemQuery.rows[0].semester+"' "+
        "order by id" 
    )
    RunningCourses=[]
    for (let i = 0; i < RunningCoursesQuery.rows.length; i++)
    {
        if(RunningCourses.length==0)
        {
            RunningCourses[0] = {
                id: RunningCoursesQuery.rows[i].id,
                name: RunningCoursesQuery.rows[i].name,
                sections: [RunningCoursesQuery.rows[i].sec_id]
            }
        }
        else if(RunningCourses[RunningCourses.length-1].id===RunningCoursesQuery.rows[i].id)
        {
            RunningCourses[RunningCourses.length-1].sections.push(RunningCoursesQuery.rows[i].sec_id)
        }
        else
        {
            RunningCourses.push({
                id: RunningCoursesQuery.rows[i].id,
                name: RunningCoursesQuery.rows[i].name,
                sections: [RunningCoursesQuery.rows[i].sec_id]
            })
        }

    }


    return {Courses:Courses.rows,RunningCourses:RunningCourses}
}

module.exports = CoursesQuery