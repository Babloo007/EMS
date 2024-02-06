import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);

    deleteEmployee(id)
      .then(() => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex flex-col m-8 justify-between gap-2">
      <h1 className="text-center text-2xl bg-slate-50">List of Employees</h1>
      <div className="mx-16 px-16 flex flex-col gap-2 justify-center size-11/12">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 w-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={addNewEmployee}
          >
            Add Employee
          </button>
        </div>
        <table className="border-collapse border table-auto">
          <thead>
            <tr>
              <th className="border py-2 px-4 text-left">Employee Id</th>
              <th className="border py-2 px-4 text-left">
                Employee First Name
              </th>
              <th className="border py-2 px-4 text-left">Employee Last Name</th>
              <th className="border py-2 px-4 text-left">Employee Email Id</th>
              <th className="border py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className={index % 2 === 0 ? "" : "bg-slate-100"}
              >
                <td className="border py-2 px-4">{employee.id}</td>
                <td className="border py-2 px-4">{employee.firstName}</td>
                <td className="border py-2 px-4">{employee.lastName}</td>
                <td className="border py-2 px-4">{employee.email}</td>
                <td className="border py-2 px-4">
                  <button
                    className="bg-[#06b6d4] hover:bg-[#0284c7] text-white font-bold w-24 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-[#f43f5e] hover:bg-[#e11d48] text-white font-bold w-24 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => removeEmployee(employee.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
