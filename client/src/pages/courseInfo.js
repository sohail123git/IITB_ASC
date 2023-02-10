import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link,useParams,useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


function CourseInfo() {
  const cookie = new Cookies()
  const accessToken = cookie.get("accessToken")
  const {id} = useParams()
  console.log(id)
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
    axios.post("http://localhost:5000/courses/courseinfo", {ID:id,headers:{
      accessToken: accessToken,
    }}).then((response) => {
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
  },[navigate,id,accessToken])

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
      <div value="Course ID">ID:{CourseInfo.courseID}</div>
      <div value="Name">Name:{CourseInfo.courseName}</div>
      <div value="dept_name">Department:{CourseInfo.deptName}</div>
      <div value="tot_cred">Total Credits:{CourseInfo.credits}</div>
      <div id = "course_table_div">
        <table>
          <tr>
            <th>CID</th>
          </tr>
          {CourseInfo.preReq.map((val, key)=> {
            return (
              <tr key={key}>
                <Link to={"/courses/"+val.prereq_id}>{val.prereq_id}</Link>
              </tr>
            )
            })
          }
        </table>
      </div>
      <div id = "prof_div">
        <table>
          <tr>
            <th>ID</th>
            <th>name</th>
          </tr>
          {CourseInfo.profs.map((val, key)=> {
            return (
              <tr key={key}>
                <Link to={"/instructors/"+val.id}>{val.id}</Link>
                <td>{val.name}</td>
              </tr>
            )
            })
          }
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
        <div>
          <div className="heading">
            Instructors for this course
          </div>
          <table className='table'>
            <tr className='tr'>
              <th className='th'>ID</th>
              <th className='th'>name</th>
            </tr>
            {CourseInfo.profs.map((val, key)=> {
              return (
                <tr className='tr' key={key}>
                  <Link className='links' to={"/instructors/"+val.id}>{val.id}</Link>
                  <td className='td'>{val.name}</td>
                </tr>
              )
              })
            }
          </table>
        </div>
      </div>
    )
  }
}

export default CourseInfo