import React, { useEffect, useState } from "react";
import { getAllDepartments, deleteDepartment } from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments()
      .then((response) => {
        console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigator = useNavigate();

  function addNewDepartment() {
    navigator("/add-department");
  }

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`);
  }

  function removeDepartment(id) {
    console.log(id);

    deleteDepartment(id)
      .then(() => {
        getAllDepartments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex flex-col m-8 justify-between gap-2">
      <h1 className="text-center text-2xl bg-slate-50">List of Departments</h1>
      <div className="mx-16 px-16 flex flex-col gap-2 justify-center size-11/12">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 w-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={addNewDepartment}
          >
            Add Department
          </button>
        </div>
        <table className="border-collapse border table-auto">
          <thead>
            <tr>
              <th className="border py-2 px-4 text-left">Department Id</th>
              <th className="border py-2 px-4 text-left">Department Name</th>
              <th className="border py-2 px-4 text-left">Department Description</th>
              <th className="border py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr
                key={department.id}
                className={index % 2 === 0 ? "" : "bg-slate-100"}
              >
                <td className="border py-2 px-4">{department.id}</td>
                <td className="border py-2 px-4">
                  {department.departmentName}
                </td>
                <td className="border py-2 px-4">
                  {department.departmentDescription}
                </td>
                <td className="border py-2 px-4">
                  <button
                    className="bg-[#06b6d4] hover:bg-[#0284c7] text-white font-bold w-24 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => updateDepartment(department.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-[#f43f5e] hover:bg-[#e11d48] text-white font-bold w-24 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => removeDepartment(department.id)}
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
}

export default DepartmentList;
