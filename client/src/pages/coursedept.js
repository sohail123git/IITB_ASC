import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams,Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


function CourseDept() {
  const cookie = new Cookies()
  const {dept} = useParams()
  const accessToken = cookie.get("accessToken")
  const [courses, setCourses] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    axios.post("http://localhost:5000/course/coursedept", {dept:dept}).then((response) => {
      if(response.data.err){
        alert(response.data.err)
        navigate("/login")
      }
      else if(response.data.error){
        alert(response.data.error)
        navigate("/home")
      }
      else{
        // console.log(response.data)
        setCourses(response.data.RunningCourses)
      }
    })
  },[navigate,accessToken,dept])
  if(courses.length!==0){
  return  (
    <div>
        <div className='navbar'>
          <Link className='links' to="/home">Home</Link>
          <Link className='links' to="/course">Courses</Link>
          <Link className='links' to="/course/running">Running</Link>
        </div>
        <div>
            <div className='heading'> 
              Courses offered by the department of {dept} this semester
            </div>
            <table className='table'>
              <tbody>
                {courses.map((val, key)=> {
                  return (
                    <tr className='tr' key={key}>
                      <td>
                        <Link className='links' to={"/course/"+val.id}>{val.id}</Link>  
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
    return (
      <div>
      <div className='navbar'>
        <Link className='links' to="/home">Home</Link>
        <Link className='links' to="/course">Courses</Link>
        <Link className='links' to="/course/running">Running</Link>
      </div>
        <div className='heading'>This department does not offer any course this semester</div>
      </div>
    )
  }
}

export default CourseDept