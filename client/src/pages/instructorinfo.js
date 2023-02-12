import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link,useParams,useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


function InstructorInfo() {
  const cookie = new Cookies()
  const accessToken = cookie.get("accessToken")
  const {id} = useParams()
  const [instructorInfo, setInstructorinfo] = useState({
    ID:'',
    Name:'',
    dept_name:'',
    CurrentCourses:[],
    CoursesTaught:[]
  }
  )
  let navigate = useNavigate()
  useEffect(() => {
    axios.post("http://localhost:5000/instructors/instructorinfo", {ID:id,headers:{
      accessToken: accessToken,
    }}).then((response) => {
      if(response.data.err){
        alert("error")
        navigate("/login")
      }
      else if(response.data.error){
        alert(response.data.error)
        navigate("/home")
      }
      else{
        console.log(response.data)
        setInstructorinfo({
            ID:id,
            Name:response.data.info.name,
            DeptName:response.data.info.dept_name,
            CoursesTaught:response.data.CoursesTaught,
            CurrentCourses:response.data.CurrentCourses
        })
      }
    })
  },[navigate,id,accessToken])
  if(instructorInfo.ID === ''){
    return <div></div>
  }

  var currCoursesDiv;
  if(instructorInfo.CurrentCourses.length===0)
  {
    currCoursesDiv = (
      <div className='heading'>
        No courses are being offered by this professor this semester.          
      </div>
    )
  }
  else
  {
    currCoursesDiv = (
      <div>
        <div className="heading">
          Courses offered by the instructor this semester
        </div>
        <div>
          <table className='table'>
            <thead>
              <tr className='tr'>
                <th className='th'>Course ID</th>
                <th className='th'>Title</th>
              </tr>
            </thead>
            <tbody>
              {instructorInfo.CurrentCourses.map((val, key)=> {
                return (
                  <tr className='tr' key={key}>
                    <Link className='links' to={"/course/"+val.course_id}>{val.course_id}</Link>
                    <td className='td'>{val.title}</td>
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

  var prevcoursesDiv;
  if(instructorInfo.CoursesTaught.length===0)
  {
    prevcoursesDiv = (
      <div className='heading'>
        No courses were taught by this professor in the previous semesters. 
      </div>
    )
  }
  else
  {
    prevcoursesDiv = (
      <div>
        <div className="heading">
          Courses taught previous semesters
        </div>
        <table className='table'>
          <thead>
            <tr className='tr'>
              <th className='th'>Course ID</th>
              <th className='th'>Title</th>
              <th className='th'>Year</th>
              <th className='th'>Semester</th>
            </tr>
          </thead>
          <tbody>
            {instructorInfo.CoursesTaught.map((val, key)=> {
              return (
                <tr className='tr' key={key}>
                  <Link className='links' to={"/course/"+val.course_id}>{val.course_id}</Link>
                  <td className='td'>{val.title}</td>
                  <td className='td'>{val.year}</td>
                  <td className='td'>{val.semester}</td>
                </tr>
              )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
  
  return  (
    <div>
      <div className='navbar'>
        <Link className='links' to="/home">Home</Link>
        <Link className='links' to="/instructors">Instructors</Link>
      </div>
      <div className='info'>
        <div className='Detail' value="Course ID">ID:{instructorInfo.ID}</div>
        <div className='Detail' value="Username">Name:{instructorInfo.Name}</div>
        <div className='Detail' value="DeptName">Dept name:{instructorInfo.DeptName}</div>
      </div>
      {currCoursesDiv}          
      {prevcoursesDiv}      
    </div>
  )
}

export default InstructorInfo