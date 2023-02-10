import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


function Home() {
  const cookie = new Cookies()
  const accessToken = cookie.get("accessToken")
  const [HomeData, setHomedata] = useState({
    ID:"",
    username:"",
    deptname:"",
    totCreds:0,
    prevCourses: [],
    regdCourses: []
  })
  let navigate = useNavigate()
  const logout = () => {
    cookie.remove("accessToken")
    navigate("/login")
  }
  const drop = (data) => {
    axios.post("http://localhost:5000/drop",{data:data,headers:{
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
        setHomedata({
          ID: response.data.info.id,
          username: response.data.info.name,
          deptname: response.data.info.dept_name,
          totCreds: response.data.info.tot_cred,
          prevCourses: response.data.prevCourses,
          regdCourses: response.data.regdCourses
        })
      }
    })
  }
  useEffect(() => {
    axios.post("http://localhost:5000/home", {headers:{
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
        setHomedata({
          ID: response.data.info.id,
          username: response.data.info.name,
          deptname: response.data.info.dept_name,
          totCreds: response.data.info.tot_cred,
          prevCourses: response.data.prevCourses,
          regdCourses: response.data.regdCourses
        })
      }
    })
  },[navigate,accessToken])
  console.log(HomeData.prevCourses)
  if(HomeData.ID===''){
    return <div></div>
  }
  else if(HomeData.prevCourses.length===0 && HomeData.regdCourses.length===0){
    return  (
      <div>
        <div className="navbar">
          <Link className="links" to="/courses">Courses</Link>
          <Link className="links" to="/instructors">Instructors</Link>
          <Link className="links" to="/home/registration">Registration</Link>
          <Link className="links" to="/login" onClick={logout}>Logout</Link>
        </div>
        <div className="info">
          <div className="Detail" id="user_id" value="ID">ID:{HomeData.ID}</div>
          <div className="Detail" value="Username">Username:{HomeData.username}</div>
          <div className="Detail" value="dept_name">Department:{HomeData.deptname}</div>
          <div className="Detail" value="tot_cred">Total Credits:{HomeData.totCreds}</div>
        </div>
        <div>
          <div className="heading">
            No courses completed yet
          </div>
        </div>
        <div>
          <div className="heading">
            No courses registered for current   semester
          </div>
        </div>
      </div>
    )
  }
  else if(HomeData.prevCourses.length===0){
    return  (
      <div>
        <div className="navbar">
          <Link className="links" to="/courses">Courses</Link>
          <Link className="links" to="/instructors">Instructors</Link>
          <Link className="links" to="/home/registration">Registration</Link>
          <Link className="links" to="/login" onClick={logout}>Logout</Link>
        </div>
        <div className="info">
          <div className="Detail" id="user_id" value="ID">ID:{HomeData.ID}</div>
          <div className="Detail" value="Username">Username:{HomeData.username}</div>
          <div className="Detail" value="dept_name">Department:{HomeData.deptname}</div>
          <div className="Detail" value="tot_cred">Total Credits:{HomeData.totCreds}</div>
        </div>
        <div>
          <div className="heading">
            No courses completed yet
          </div>
        </div>
        <div>
          <div className="heading">
            Courses registered this semester
          </div>
          <table className="table">
          <tr>
              <th>Course ID</th>
              <th>Title</th>
            </tr>
            {HomeData.regdCourses.map((val, key)=> {
              return (
                <tr className='tr' key={key}>
                  <td className='td'>{val.course_id}</td>
                  <td className='td'>{val.title}</td>
                  <button className='drop' onClick={() => drop(val.course_id)}>Drop</button>
                </tr>
              )
              })
            }
          </table>
        </div>
      </div>
    )
  }
  else if(HomeData.regdCourses.length===0){
    return  (
      <div>
        <div className="navbar">
          <Link className="links" to="/courses">Courses</Link>
          <Link className="links" to="/instructors">Instructors</Link>
          <Link className="links" to="/home/registration">Registration</Link>
          <Link className="links" to="/login" onClick={logout}>Logout</Link>
          
        </div>
        <div className="info">
          <div className="Detail" id="user_id" value="ID">ID:{HomeData.ID}</div>
          <div className="Detail" value="Username">Username:{HomeData.username}</div>
          <div className="Detail" value="dept_name">Department:{HomeData.deptname}</div>
          <div className="Detail" value="tot_cred">Total Credits:{HomeData.totCreds}</div>
        </div>
        <div>
          <div className="heading">
            Completed Courses
          </div>
          <table className="table">
            <tr>
              <th>Course ID</th>
              <th>Title</th>
              <th>Section ID</th>
              <th>Grade</th>
              <th>Semester</th>
              <th>Year</th>
            </tr>
            {HomeData.prevCourses.map((val, key)=> {
              return (
                <tr className="tr" key={key}>
                  <td className="td">{val.course_id}</td>
                  <td className="td">{val.title}</td>
                  <td className="td">{val.grade}</td>
                  <td className="td">{val.sec_id}</td>
                  <td className="td">{val.semester}</td>
                  <td className="td">{val.year}</td>
                </tr>
              )
              })
            }
          </table>
        </div>
        <div>
          <div className="heading">
            No courses registered for current semester
          </div>
        </div>
      </div>
    )
  }
  else{
    return  (
      <div>
        <div className="navbar">
          <Link className="links" to="/courses">Courses</Link>
          <Link className="links" to="/instructors">Instructors</Link>
          <Link className="links" to="/home/registration">Registration</Link>
          <Link className="links" to="/login" onClick={logout}>Logout</Link>
        </div>
        <div className="info">
          <div className="Detail" id="user_id" value="ID">ID:{HomeData.ID}</div>
          <div className="Detail" value="Username">Username:{HomeData.username}</div>
          <div className="Detail" value="dept_name">Department:{HomeData.deptname}</div>
          <div className="Detail" value="tot_cred">Total Credits:{HomeData.totCreds}</div>
        </div>
        <div>
          <div className="heading">
            Completed Courses
          </div>
          <table className="table">
            <tr>
              <th>Course ID</th>
              <th>Title</th>
              <th>Section ID</th>
              <th>Grade</th>
              <th>Semester</th>
              <th>Year</th>
            </tr>
            {HomeData.prevCourses.map((val, key)=> {
              return (
                <tr className="tr" key={key}>
                  <td className="td">{val.course_id}</td>
                  <td className="td">{val.title}</td>
                  <td className="td">{val.grade}</td>
                  <td className="td">{val.sec_id}</td>
                  <td className="td">{val.semester}</td>
                  <td className="td">{val.year}</td>
                </tr>
              )
              })
            }
          </table>
        </div>
        <div>
          <div className="heading">
            Courses registered this semester
          </div>
          <table className="table">
          <tr>
              <th>Course ID</th>
              <th>Title</th>
            </tr>
            {HomeData.regdCourses.map((val, key)=> {
              return (
                <tr className='tr' key={key}>
                  <td className='td'>{val.course_id}</td>
                  <td className='td'>{val.title}</td>
                  <button className='drop' onClick={() => drop(val.course_id)}>Drop</button>
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

export default Home
