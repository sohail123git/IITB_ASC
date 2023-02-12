const client = require("../models/database")

async function registerCourse(req) {
    console.log(req.body.data)
    console.log(req.session.userid)
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

    //prerequisites
    const unsat_prereqs = await client.query(
        "select prereq_id from prereq\
         where course_id='"+req.body.data.id+"'\
        and not exists\
        (\
        select * from takes\
        where id='"+req.session.userid+"'\
        and prereq_id = takes.course_id\
        )"
    )
    if(unsat_prereqs.rows.length!=0)
    {
        return {error:"there are unsatisfied prerequisites", unsat_prereqs:unsat_prereqs.rows}
    }

    const is_course_already_taken = await client.query(
        "select * from takes where course_id='"+req.body.data.id+
        "' and id='"+req.session.userid+"'"
        )
    if(is_course_already_taken.rows.length!=0)
    {
        return {error:"course already taken"}
    }

    // get course slot
    const course = await client.query(
        "select s.course_id, s.year, s.semester, s.sec_id, s.time_slot_id  from\
        section as s \
        where\
        course_id='"+req.body.data.id+"' and sec_id='"+req.body.data.section+"' and\
        year="+currSemQuery.rows[0].year+" and semester='"+currSemQuery.rows[0].semester+"'"
    )
    console.log(course.rows)
    if(course.rows.length!=1)
    {
        return {error:"select section."}
    }
    // courses taken by student inthis sem with the above slotid
    //  returns empty if new course can be added  
    const slot = course.rows[0].time_slot_id



    const courses_taken = await client.query(
        "\
        with c as (\
        select t.id, t.course_id, t.year, t.semester, t.sec_id, s.time_slot_id  from\
        takes as t JOIN section as s ON t.course_id = s.course_id and t.year = s.year and t.semester = s.semester and t.sec_id = s.sec_id\
        where t.year = "+currSemQuery.rows[0].year+" and t.semester ='"+currSemQuery.rows[0].semester+"'\
        )\
        select * from c\
        where id = '"+req.session.userid+"' \
        and time_slot_id = '"+slot+"'\
        "
    )
    
    //slot already filled
    if(courses_taken.rows.length!=0)
    {
        return {error:"a course in current slot already taken", courses_taken:courses_taken.rows}
    }


    try {
        await client.query(
            "insert into takes values($1,$2,$3,$4,$5)",
            [
                req.session.userid,
                req.body.data.id,
                req.body.data.section,
                currSemQuery.rows[0].semester,
                currSemQuery.rows[0].year
            ]
        )
    } catch (e) {
        return false
    }
    return true
}

module.exports = registerCourse

