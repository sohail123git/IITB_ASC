import axios from "axios"
import {ReactSearchAutocomplete} from "react-search-autocomplete"
import React from "react"
import { useEffect,useState } from "react"
import { Link,useNavigate } from "react-router-dom"

function Registration() {
    const navigate = useNavigate()
    const [items, setCourses] = useState([])
    const [searches, setSearches] = useState([])
    const [section, setSection] = useState()
    const handleChange = (event) => {
      setSection(event.target.value);
    };
    useEffect(() => {
        axios.post("http://localhost:5000/registration").then((response) => {

          console.log("/reg")
          console.log(response.data)
          if(response.data.err){
            alert(response.data.err)
            navigate("/login")
          }
          else if(response.data.error){
            alert(response.data.error)
            navigate("/home")
          }
          else{ 
            setCourses(response.data.RunningCourses)
          }
        })
      },[navigate])

      const Register = (data) => {
        console.log("regtry")
        console.log(data)
        axios.post("http://localhost:5000/registration/register", {data:data}).then((response) => {
          if(response.data.err){
            alert(response.data.err)
            navigate("/login")
          }
          else if(response.data.error){
            alert(response.data.error)
            navigate("/home/registration")
          }
          else if(!response.data)
          {
            alert("Instructors not allowed to register")
            navigate("/home")
          }
          else{
            alert("Registered Successfully")
            navigate("/home")
          }
        })
      }
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        setSearches(results)
        // console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        // console.log("hovering")
        // console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        // console.log(item)
      }
    
      const handleOnFocus = () => {
        // console.log('Focused')
      }
    
      const formatResult = (item) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
            <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
          </>
        )
      }
    
      return (
        <div>
          <div className="navbar">
            <Link className="links" to="/home">Home</Link>
          </div>
           <header>
            <div className="search" style={{ width: 400 }}>
              <ReactSearchAutocomplete
                items={items}
                fuseOptions={{ keys: ["id", "name"] }}
                showIcon={false}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                formatResult={formatResult}
                placeholder="Enter Course ID or name"
                autoFocus
                styling = {
                  {
                    borderRadius:'10px',
                    backgroundColor:"white",
                  }
                }
              />
            </div>
          </header>
          <div id = "course_table_div">
            <table className="table">
              <tbody>
                {searches.map((val, key)=> {
                  return (
                    <tr className="tr" key={key}>
                      <td className="td">{val.id}</td>
                      <td className="td">{val.name}</td>
                      <td>
                        <label className="label">
                          Choose section
                          <select value={section} onChange={handleChange}>
                            <option>Select</option>
                            {
                              val.sections.map((val,key)=> {
                                return (
                                  <option key = {key} value={val}>{val}</option>
                                )
                              })
                            }
                          </select>
                        </label>
                      </td>
                      <td>
                        <button className="regr" onClick={() => Register({id:val.id,section:section})}>Register</button>
                      </td>
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
  

export default Registration