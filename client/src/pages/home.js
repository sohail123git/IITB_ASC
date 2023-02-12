import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

axios.defaults.withCredentials=true;

function Home() {
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
    axios.get("http://localhost:5000/login/logout").then(()=>{
      navigate("/login")
    })
  }
  const drop = (data) => {
    axios.post("http://localhost:5000/drop",{data:data}).then((response) => {
      if(response.data.err){
        alert(response.data.err)
        navigate("/login")
      }
      else if(response.data.error){
        alert(response.data.error)
        navigate("/home")
      }
      else{
        
        console.log("drop response")
        console.log(response.data)
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
    axios.post("http://localhost:5000/home").then((response) => {
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
  },[navigate])
  console.log(HomeData.prevCourses)
  if(HomeData.ID===''){
    return <div></div>
  }
  // else if(HomeData.prevCourses.length===0 && HomeData.regdCourses.length===0){
  //   return  (
  //     <div>
  //       <div className="navbar">
  //         <Link className="links" to="/courses">Courses</Link>
  //         <Link className="links" to="/instructors">Instructors</Link>
  //         <Link className="links" to="/home/registration">Registration</Link>
  //         <Link className="links" to="/login" onClick={logout}>Logout</Link>
  //       </div>
  //       <div className="info">
  //         <div className="Detail" id="user_id" value="ID">ID:{HomeData.ID}</div>
  //         <div className="Detail" value="Username">Username:{HomeData.username}</div>
  //         <div className="Detail" value="dept_name">Department:{HomeData.deptname}</div>
  //         <div className="Detail" value="tot_cred">Total Credits:{HomeData.totCreds}</div>
  //       </div>
  //       <div>
  //         <div className="heading">
  //           No courses completed yet
  //         </div>
  //       </div>
  //       <div>
  //         <div className="heading">
  //           No courses registered for current   semester
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  // else if(HomeData.prevCourses.length===0){
  //   return  (
  //     <div>
  //       <div className="navbar">
  //         <Link className="links" to="/courses">Courses</Link>
  //         <Link className="links" to="/instructors">Instructors</Link>
  //         <Link className="links" to="/home/registration">Registration</Link>
  //         <Link className="links" to="/login" onClick={logout}>Logout</Link>
  //       </div>
  //       <div className="info">
  //         <div className="Detail" id="user_id" value="ID">ID:{HomeData.ID}</div>
  //         <div className="Detail" value="Username">Username:{HomeData.username}</div>
  //         <div className="Detail" value="dept_name">Department:{HomeData.deptname}</div>
  //         <div className="Detail" value="tot_cred">Total Credits:{HomeData.totCreds}</div>
  //       </div>
  //       <div>
  //         <div className="heading">
  //           No courses completed yet
  //         </div>
  //       </div>
  //       <div>
  //         <div className="heading">
  //           Courses registered this semester
  //         </div>
  //         <table className="table">
  //           <thead>
  //             <tr>
  //               <th>Course ID</th>
  //               <th>Title</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {HomeData.regdCourses.map((val, key)=> {
  //               return (
  //                 <tr className='tr' key={key}>
  //                   <td className='td'>{val.course_id}</td>
  //                   <td className='td'>{val.title}</td>
  //                   <button className='drop' onClick={() => drop(val.course_id)}>Drop</button>
  //                 </tr>
  //               )
  //               })
  //             }
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   )
  // }
  // else if(HomeData.regdCourses.length===0){
  //   return  (
  //     <div>
  //       <div className="navbar">
  //         <Link className="links" to="/courses">Courses</Link>
  //         <Link className="links" to="/instructors">Instructors</Link>
  //         <Link className="links" to="/home/registration">Registration</Link>
  //         <Link className="links" to="/login" onClick={logout}>Logout</Link>
          
  //       </div>
  //       <div className="info">
  //         <div className="Detail" id="user_id" value="ID">ID:{HomeData.ID}</div>
  //         <div className="Detail" value="Username">Username:{HomeData.username}</div>
  //         <div className="Detail" value="dept_name">Department:{HomeData.deptname}</div>
  //         <div className="Detail" value="tot_cred">Total Credits:{HomeData.totCreds}</div>
  //       </div>
  //       <div>
  //         <div className="heading">
  //           Completed Courses
  //         </div>
  //         {
  //           HomeData.prevCourses.map((val,key)=>{
  //             // console.log("key")
  //             // console.log(key)
  //             return (
  //               <div>
  //                 <h1>
  //                   {val.year}, {val.semester} 
  //                 </h1>
  //                 <table className='table' key={key}>
  //                   <thead>
  //                     <tr>
  //                       <th>Course ID</th>
  //                       <th>Title</th>
  //                       <th>Section ID</th>
  //                       <th>Grade</th>
  //                       <th>Semester</th>
  //                       <th>Year</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {
  //                       val.courses.map((cval,ckey)=>{
  //                         return(
  //                           <tr className="tr" key={ckey}>
  //                             <td className="td">{cval.course_id}</td>
  //                             <td className="td">{cval.title}</td>
  //                             <td className="td">{cval.grade}</td>
  //                             <td className="td">{cval.sec_id}</td>
  //                             <td className="td">{cval.semester}</td>
  //                             <td className="td">{cval.year}</td>
  //                           </tr>
  //                         )
  //                       })
  //                     }
  //                   </tbody>
              
  //                 </table>
  //               </div>
  //             )
  //           })
  //         }
  //       </div>
  //       <div>
  //         <div className="heading">
  //           No courses registered for current semester
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  else{
    return  (
      <div>

        <div className="navbar">
          <Link className="links" to="/course">Courses</Link>
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
            Courses registered this semester
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Section</th>
                <th>Drop</th>
              </tr>
            </thead>
            <tbody>
              {HomeData.regdCourses.map((val, key)=> {
                return (
                  <tr className='tr' key={key}>
                    <td className='td'>{val.course_id}</td>
                    <td className='td'>{val.title}</td>
                    <td className='td'>{val.sec_id}</td>
                    <td className='td'>
                      <button className='drop' onClick={() => drop(val.course_id)}>Drop</button>
                    </td>
                  </tr>
                )
              })
              }
          </tbody>
          </table>
        </div>
        <div>
          <div className="heading">
            Completed Courses
          </div>
          {
            HomeData.prevCourses.map((val,key)=>{
              return (
                <div key={key}>
                  <h2>
                    {val.year}, {val.semester} 
                  </h2>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Course ID</th>
                        <th>Title</th>
                        <th>Section ID</th>
                        <th>Grade</th>
                        <th>Semester</th>
                        <th>Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        val.courses.map((cval,ckey)=>{
                          return(
                            <tr className="tr" key={ckey}>
                              <td className="td">{cval.course_id}</td>
                              <td className="td">{cval.title}</td>
                              <td className="td">{cval.sec_id}</td>
                              <td className="td">{cval.grade}</td>
                              <td className="td">{cval.semester}</td>
                              <td className="td">{cval.year}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
              
                  </table>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Home
