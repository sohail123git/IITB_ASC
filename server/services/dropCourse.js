const client = require("../models/database")
const studentInfo = require("./student_info")

async function dropCourse(req) {
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sem_yr = await client.query("select year,semester from reg_dates where start_time<='"+tstamp+"' and end_time>='"+tstamp+"'")
    if(sem_yr.rows.length!=0)
    {
        const yr = sem_yr.rows[0].year
        const sem = sem_yr.rows[0].semester
        s ="delete from takes where course_id = '"+req.body.data+"' and year = "+yr+" and semester='"+sem+"' and id = '"+req.user.ID+"'"
        console.log(s)
        const resp = await client.query("delete from takes where course_id = '"+req.body.data+"' and year = "+yr+" and semester='"+sem+"' and id = '"+req.user.ID+"'")
        console.log(resp)
        return studentInfo(req)
    }
    else{
        return {error:"this year, semester entry hasnt been created yet"};
    }
}

module.exports = dropCourse