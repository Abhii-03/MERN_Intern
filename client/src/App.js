import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import EmployeeForm from "./components/CreateEmployeeForm";
import EditEmployeeForm from "./components/EditEmployeeForm";
import Dashboard from "./components/Dashboard";
import GetAllEmployee from "./components/GetAllEmployee";


const App = () => {
  return (
    <div className="">
       
      <Routes>
       <Route path="/" element={<Login/>} />
       <Route path="/dashboard" element={<Dashboard/>} />
       <Route path="/signup" element={<Signup/>} />
       <Route path="/navbar" element={<Navbar/>} />
       <Route path="/employee" element={<EmployeeForm/>} />
       <Route path="/editEmployee" element={<EditEmployeeForm/>} />
       <Route path="/allEmployee" element={<GetAllEmployee/>} />
      </Routes>
     
    </div>
  );
}

export default App;
