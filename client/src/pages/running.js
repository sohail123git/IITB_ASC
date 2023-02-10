import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'



function Running() {
  const cookie = new Cookies()
  const accessToken = cookie.get("accessToken")
  const [departments, setDepartments] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    axios.post("http://localhost:5000/courses/running", {headers:{
      accessToken: accessToken,
    }}).then((response) => {
      if(response.data.err){
        alert(response.data.err)
        navigate("/login")
      }
      else{
        console.log(response.data.RunningCourses)
        setDepartments(response.data.Departments)
      }
    })
  },[navigate,accessToken])
  if(departments.length!==0){
  return  (
    <div>
        <div className='navbar'>
          <Link className='links' to="/home">Home</Link>
          <Link className='links' to="/courses">Courses</Link>
        </div>
        <div>
          <div className="heading">
            Departments offering course this semester this semester
          </div>
          <table className='table'>
              {departments.map((val, key)=> {
                return (
                  <tr className='tr' key={key}>
                    <Link className='links' to={"/courses/running/"+val.dept_name}>{val.dept_name}</Link>
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
        <div className='navbar'>
          <Link className='links' to="/home">Home</Link>
        </div>
        <div className='heading'>
          No department is offering a course this semester 
        </div>
      </div>
    )
  }
}

export default Running
