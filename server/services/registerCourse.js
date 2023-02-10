const client = require("../models/database")

async function registerCourse(req) {
    console.log(req.body.data)
    console.log(req.user.ID)
    const tstamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const unsat_prereqs = await client.query(
        "select prereq_id from prereq\
         where course_id='"+req.body.data.id+"'\
        and not exists\
        (\
        select * from takes\
        where id='"+req.user.ID+"'\
        and prereq_id = takes.course_id\
        )"
    )
    if(unsat_prereqs.rows.length!=0)
    {
        return {error:"there are unsatisfied prerequisites", unsat_prereqs:unsat_prereqs.rows}
    }
    
    // get course slot
    const course = await client.query(
        "select s.course_id, s.year, s.semester, s.sec_id, s.time_slot_id, r.start_time, r.end_time  from\
        section as s JOIN reg_dates as r ON s.year = r.year and s.semester = r.semester\
        where\
        course_id='"+req.body.data.id+"' and sec_id='"+req.body.data.section+"' and\
        start_time<='"+tstamp+"' and end_time>'"+tstamp+"'\
        "
    )
    if(course.rows.length!=1)
    {
        return {error:"trying to register course not offered this sem. section might be wrong"}
    }
    // courses taken by student inthis sem with the above slotid
    //  returns empty if new course can be added  
    const slot = course.rows[0].time_slot_id

    const course_taken = await client.query(
        "\
        with c as (\
        select t.id, t.course_id, t.year, t.semester, t.sec_id, s.time_slot_id, r.start_time, r.end_time  from\
        takes as t JOIN section as s ON t.course_id = s.course_id and t.year = s.year and t.semester = s.semester and t.sec_id = s.sec_id\
        JOIN reg_dates as r ON t.year = r.year and t.semester = r.semester\
        )\
        select * from c\
        where id = '"+req.user.ID+"'\
        and start_time<='"+tstamp+"' and c.end_time>'"+tstamp+"'\
        and time_slot_id = '"+slot+"'\
        "
    )
    //slot already filled
    if(course_taken.rows.length!=0)
    {
        return {error:"a course in current slot already taken", course_taken:course_taken.rows}
    }
    const sem_yr = await client.query("select year,semester from reg_dates where start_time<='"+tstamp+"' and end_time>='"+tstamp+"'")
    if(sem_yr.rows.length!=0)
    {
        const yr = sem_yr.rows[0].year
        const sem = sem_yr.rows[0].semester
        await client.query("insert into takes values($1,$2,$3,$4,$5,$6)",[req.user.ID,req.body.data.id,req.body.data.section,sem,yr,    null])
        return true

    }
    else{
        return {error:"this year, semester entry hasnt been created yet"};
    }

}

module.exports = registerCourse

