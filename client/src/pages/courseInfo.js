import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link,useParams,useNavigate } from 'react-router-dom'


function CourseInfo() {
  const {id} = useParams()
  const [CourseInfo, setCourseinfo] = useState({
    courseID:'',
    courseName:'',
    deptName:'',
    credits: 0,
    preReq:[],
    profs:[]
  }
  )
  let navigate = useNavigate()
  useEffect(() => {
    axios.post("http://localhost:5000/course/courseinfo", {ID:id}).then((response) => {
      if(response.data.err){
        alert(response.data.err)
        navigate("/login")
      }
      else if(response.data.error){
        alert(response.data.error)
        navigate("/home")
      }
      else{
        console.log(response.data)
        setCourseinfo({
            courseID:response.data.courseInfo.course_id,
            courseName:response.data.courseInfo.title,
            deptName:response.data.courseInfo.dept_name,
            credits:response.data.courseInfo.credits,
            preReq:response.data.prereqInfo,
            profs:response.data.InstructorsInfo
        })
      }
    })
  },[navigate,id])

  console.log(CourseInfo.preReq)
  if(CourseInfo.courseID===''){
    return <div></div>
  }
  else if(CourseInfo.preReq.length!==0){
  return  (
    <div>
      <div className='navbar'>
        <Link className='links' to="/home">Home</Link>
      </div>
      <div value="Course ID"><h2>ID: {CourseInfo.courseID}</h2></div>
      <div value="Name"><h2>Name: {CourseInfo.courseName}</h2></div>
      <div value="dept_name"><h2>Department: {CourseInfo.deptName}</h2></div>
      <div value="tot_cred"><h2>Total Credits: {CourseInfo.credits}</h2></div>
      <div id = "prof_div">
        <div className="heading">
            Instructors for this course

        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {CourseInfo.profs.map((val, key)=> {
              return (
                <tr key={key}>
                  <td>
                    <Link className='links' to={"/instructors/"+val.id}>{val.id}</Link>
                  </td>
                  <td>{val.name}</td>
                </tr>
              )
              })
            }
          </tbody>
        </table>
      </div>
      <div className="heading">
            Prerequisites
      </div>
      <div id = "course_table_div">
        <table className="table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {CourseInfo.preReq.map((val, key)=> {
              return (
                <tr key={key}>
                  <td>
                    <Link className='links' to={"/course/"+val.prereq_id}>{val.prereq_id}</Link>
                  </td>
                  <td>{val.name}</td>
                </tr>
              )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
  }
  else{
    return  (
      <div>
        <div className='navbar'>
          <Link className='links' to="/home">Home</Link>
          <Link className='links' to="/courses">Courses</Link>
        </div>
        <div className='info'>
          <div className='Detail' value="Course ID">ID:{CourseInfo.courseID}</div>
          <div className='Detail' value="Name">Name:{CourseInfo.courseName}</div>
          <div className='Detail' value="dept_name">Department:{CourseInfo.deptName}</div>
          <div className='Detail' value="tot_cred">Total Credits:{CourseInfo.credits}</div>
        </div>
        <div id = "prof_div">
        <div className="heading">
            Instructors for this course
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {CourseInfo.profs.map((val, key)=> {
              return (
                <tr key={key}>
                  <td>
                    <Link className='links' to={"/instructors/"+val.id}>{val.id}</Link>
                  </td>
                  <td>{val.name}</td>
                </tr>
              )
              })
            }
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}

export default CourseInfo