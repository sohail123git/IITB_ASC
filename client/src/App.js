import "./App.css"
import { BrowserRouter as Router , Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import Registration from "./pages/registration"
import Courses from "./pages/courses"
import CourseInfo from "./pages/courseInfo"
import InstructorInfo from "./pages/instructorinfo"
import Instructors from "./pages/instructors"
import Running from "./pages/running"
import CourseDept from "./pages/coursedept"

function App() {
  return <div className="App">
    <Router>
      <Routes>
        <Route path = "/login" element={<Login/>}/> 
        <Route path = "/home" element={<Home/>}/>
        <Route path = "/home/registration" element={<Registration/>}/>
        <Route path = "/course" element={<Courses/>}/>
        <Route path = "/course/:id" element={<CourseInfo/>}/>
        <Route path = "/course/running" element={<Running/>}/>
        <Route path = "/course/running/:dept" element={<CourseDept/>}/>
        <Route path = "/instructors" element={<Instructors/>}/>
        <Route path = "/instructors/:id" element={<InstructorInfo/>}/>
      </Routes>
    </Router>
  </div>
}

export default App