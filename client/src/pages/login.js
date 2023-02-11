import {Formik, Form, Field} from "formik"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import logo from '../logoff.png'


function Login() {
    let navigate = useNavigate()
    const initialValues = {
        ID : "",
        Password: "",
    }
    const onSubmit = (data) => {
      // console.log(data)
      axios.post("http://localhost:5000/login", data).then((response) => {
          if(response.data.error)
            alert(response.data.error)
          else{
            // alert(response)
            // console.log(response)
            // cookie.set("accessToken",response.data)
            navigate("/home")
          }
        })
    } 
    return (
    <div>
      <img className="logo" src={logo} alt=""/>
      <div className="Login">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="formContainer">
            <Field id="loginField" name="ID" placeholder="Enter ID"/>     
            <Field id="loginFieldpassword" name="Password" type="password" placeholder="Enter Password"/>
            <button type="submit">Login</button>
        </Form>
      </Formik>
      </div>  
      <div className="Creators">Website 2023-2024 By Alan Babu and Ebrahim Sohail Haris</div>
    </div>
  )
}

export default Login
    