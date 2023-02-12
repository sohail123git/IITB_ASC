import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



function Running() {
  const [departments, setDepartments] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    axios.post("http://localhost:5000/course/running").then((response) => {
      if(response.data.err){
        alert(response.data.err)
        navigate("/login")
      }
      else{
        setDepartments(response.data.Departments)
      }
    })
  },[navigate])
  if(departments.length!==0){
  return  (
    <div>
        <div className='navbar'>
          <Link className='links' to="/home">Home</Link>
          <Link className='links' to="/courses">Courses</Link>
        </div>
        <div>
          <div className="heading">
            Departments offering courses this semester
          </div>
          <table className='table'>
            <tbody>              
              {departments.map((val, key)=> {
                return (
                  <tr className='tr' key={key}>
                    <td>
                      <Link className='links' to={"/course/running/"+val.dept_name}>{val.dept_name}</Link>
                    </td>
                    <td className='td'>{val.name}</td>
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
        </div>
        <div className='heading'>
          No department is offering a course this semester
        </div>
      </div>
    )
  }
}

export default Running
