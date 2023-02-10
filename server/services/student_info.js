const client = require("../models/database")

async function studentInfo(req) {
    const info = await client.query("select * from student where ID='"+req.user.ID+"'")
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const prevCourses = await client.query(
        "select * from "+
        "takes,course,reg_dates where "+
        "id = '"+req.user.ID+ "' and "+
        "takes.course_id = course.course_id and takes.year=reg_dates.year and takes.semester = reg_dates.semester and "+
        "reg_dates.end_time<'"+tstamp+
        "' order by takes.year desc, takes.semester desc"
    )
    console.log("select * from "+
    "takes,course,reg_dates where "+
    "id = '"+req.user.ID+ "' and "+
    "takes.course_id = course.course_id and takes.year=reg_dates.year and takes.semester = reg_dates.semester and "+
    "reg_dates.end_time>'"+tstamp+"' and reg_dates.start_time<='"+tstamp+
    "' order by takes.year desc, takes.semester desc")
    const regdCourses = await client.query(
        "select * from "+
        "takes,course,reg_dates where "+
        "id = '"+req.user.ID+ "' and "+
        "takes.course_id = course.course_id and takes.year=reg_dates.year and takes.semester = reg_dates.semester and "+
        "reg_dates.end_time>'"+tstamp+"' and reg_dates.start_time<='"+tstamp+
        "' order by takes.year desc, takes.semester desc"
    )
    return {info:info.rows,prevCourses:prevCourses.rows,regdCourses:regdCourses.rows}
}

module.exports = studentInfo