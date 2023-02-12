import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


function Courses() {
  const cookie = new Cookies()
  const accessToken = cookie.get("accessToken")
  const [Instructors, setInstructors] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    axios.post("http://localhost:5000/instructors", {headers:{
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
        setInstructors(response.data)
      }
    })
  },[navigate,accessToken])
  if(Instructors.length!==0){
  return  (
    <div>
        <div className='navbar'>
          <Link className='links' to="/home">Home</Link>
        </div>
         <div className='instr'>
            <div className='heading'>
              Instructors
            </div>
            <table className='table'>
              <tbody>
                {Instructors.map((val, key)=> {
                  return (
                    <tr className='tr' key={key}>
                      <Link className='links' to={"/instructors/"+val.id}>{val.id}</Link>
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
    return (<div>
        <div>
          <Link className='links' to="/home">Home</Link>
        </div>
      <div className='heading'>There are currently no instructors </div>
    </div>)
  }
}

export default Courses