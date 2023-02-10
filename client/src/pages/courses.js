import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'



function Courses() {
  const cookie = new Cookies()
  const accessToken = cookie.get("accessToken")
  const [courses, setCourses] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    axios.post("http://localhost:5000/courses", {headers:{
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
        console.log(response.data.RunningCourses)
        setCourses(response.data.RunningCourses)
      }
    })
  },[navigate,accessToken])

  console.log(courses)
  if(courses.length!==0){
  return  (
    <div>
        <div className='navbar'>
          <Link className='links' to="/Home">Home</Link>
          <Link className='links' to="/courses/running">Running</Link>
        </div>
        <div>
          <div className="heading">
            Courses available this semester
          </div>
          <table className="table">
              <tr className='tr'>
                <th>Course ID</th>
                <th>Title</th>
              </tr>
              {courses.map((val, key)=> {
                return (
                  <tr className='tr' key={key}>
                    <Link className='links' to={"/courses/"+val.id}>{val.id}</Link>
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
  else{
    return (
      <div>
        <div>
          <Link to="/home">Home</Link>
        </div>
        <div>No courses available</div>
      </div>
    )
  }
}

export default Courses
