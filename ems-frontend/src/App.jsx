import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import Employee from "./components/Employee";
import DepartmentList from "./components/DepartmentList";
import Department from "./components/Department";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path="/" element={<EmployeeList />}></Route>
          {/* // http://localhost:3000/employees */}
          <Route path='/employees' element = { <EmployeeList /> }></Route>
          {/* // http://localhost:3000/add-employee */}
          <Route path='/add-employee' element = { <Employee />}></Route>
          {/* // http://localhost:3000/edit-employee/1 */}
          <Route path='/edit-employee/:id' element = { <Employee /> }></Route>
          {/* // http://localhost:3000/departments */}
          <Route path='/departments' element = { <DepartmentList /> }></Route>
          {/* // http://localhost:3000/add-department */}
          <Route path='/add-department' element = { <Department />}></Route>
          {/* // http://localhost:3000/edit-department */}
          <Route path='/edit-department/:id' element = { <Department />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;