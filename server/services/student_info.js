const client = require("../models/database")

async function studentInfo(userid) {
    var info = await client.query("select * from student where ID='"+userid+"'")
    if(info.rows.length==0)
    {
        info = await client.query("select * from instructor where ID='"+userid+"'")
        return {info:info.rows,prevCourses:[],regdCourses:[]}
    }
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
    
    // console.log(currSemQuery.rows)
    if(currSemQuery.rows.length!=1)
    {
        return {error:"couldnt resolve current semester"}
    }
    const semstart=currSemQuery.rows[0].start_time.slice(0, 19).replace('T', ' ');

    const prevCourses = await client.query(
        "select id, takes.course_id, takes.sec_id,takes.semester, "+
        "takes.year,grade, title, dept_name, credits,start_time,end_time from "+
        "takes,course,reg_dates where "+
        "id = '"+userid+ "' and "+
        "takes.course_id = course.course_id and takes.year=reg_dates.year and takes.semester = reg_dates.semester and "+
        "reg_dates.start_time<'"+semstart+
        "' order by reg_dates.start_time desc"
    )
    
    const prevCourseTables = []
    var table_index=0;
    for (let i = 0; i < prevCourses.rows.length; i++)
    {
        if(prevCourseTables.length==0)
        {
            prevCourseTables[0] = {
                year: prevCourses.rows[i].year,
                semester: prevCourses.rows[i].semester,
                courses: [prevCourses.rows[i]]
            }
        }
        else if(
            prevCourseTables[table_index].year===prevCourses.rows[i].year && 
            prevCourseTables[table_index].semester===prevCourses.rows[i].semester
        )
        {
            prevCourseTables[table_index].courses.push(prevCourses.rows[i])
        }
        else
        {
            prevCourseTables.push({
                year: prevCourses.rows[i].year,
                semester: prevCourses.rows[i].semester,
                courses: [prevCourses.rows[i]]
            })
            table_index+=1;
        }

    }
    // console.log(prevCourseTables)

        
    const regdCourses = await client.query(
        "select id, takes.course_id, takes.sec_id,takes.semester, "+
        "takes.year,grade, title, dept_name, credits from "+
        "takes,course where "+
        "id = '"+userid+ "' and "+
        "takes.course_id = course.course_id and takes.year="+currSemQuery.rows[0].year+
        " and takes.semester = '"+currSemQuery.rows[0].semester+
        "' order by takes.year desc, takes.semester desc"
    )
    // return {info:info.rows,prevCourses:prevCourses.rows,regdCourses:regdCourses.rows}
    return {info:info.rows,prevCourses:prevCourseTables,regdCourses:regdCourses.rows}
}

module.exports = studentInfo