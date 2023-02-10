const client = require("../models/database")

async function RunningDeptQuery(req) {
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const Departments = await client.query("select distinct dept_name from course,teaches,reg_dates "+
    "where course.course_id = teaches.course_id and reg_dates.year = teaches.year and reg_dates.semester = teaches.semester"+
    " and reg_dates.start_time<'"+tstamp+"' and reg_dates.end_time>'"+tstamp+"'")
    return {Departments: Departments.rows}
}

module.exports = RunningDeptQuery