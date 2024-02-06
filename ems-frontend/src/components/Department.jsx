import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDepartment, getDepartmentById, updateDepartment } from "../services/DepartmentService";

function Department() {

    const [departmentName, setDepartmentName] = useState("");
    const [departmentDescription, setDepartmentDescription] = useState("");

    const [errors, setErrors] = useState({
        departmentName: "",
        departmentDescription: "",
      });

    const { id } = useParams();

    useEffect(() => {
        if(id) {
          getDepartmentById(id)
            .then((response) => {
              setDepartmentName(response.data.departmentName);
              setDepartmentDescription(response.data.departmentDescription);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, [id]);

    const navigator = useNavigate();

    function addOrUpdateDepartment(e) {
        e.preventDefault();
    
        if (validateForm()) {
          const department = { departmentName, departmentDescription };
          console.log(department);
    
          if (id) {
            updateDepartment(id, department)
              .then((response) => {
                console.log(response.data);
                navigator("/departments");
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            createDepartment(department)
              .then((response) => {
                console.log(response.data);
                navigator("/departments");
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
    }

    function validateForm() {
        let valid = true;
    
        const errorsCopy = { ...errors };
    
        if (departmentName.trim()) {
          errorsCopy.departmentName = "";
        } else {
          errorsCopy.departmentName = "Department name is required";
          valid = false;
        }
    
        if (departmentDescription.trim()) {
          errorsCopy.departmentDescription = "";
        } else {
          errorsCopy.departmentDescription = "Department Description is required";
          valid = false;
        }
    
        setErrors(errorsCopy);
        return valid;
      }

    function pageTitle() {
        if (id) {
          return <h2 className="text-center">Update Department</h2>;
        } else {
          return <h2 className="text-center">Add Department</h2>;
        }
      }

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-2xl font-bold mb-4">{pageTitle()}</h1>

      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Department Name :</label>
          <input
            type="text"
            placeholder="Enter Department Name"
            name="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full ${errors.departmentName ? "border-rose-600" : "border-gray-300"}`}
            required
          ></input>
          {errors.departmentName && (
            <div className="text-rose-600"> {errors.departmentName} </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Department Description :</label>
          <input
            type="text"
            placeholder="Enter Department Description"
            name="departmentDescription"
            value={departmentDescription}
            onChange={(e) => setDepartmentDescription(e.target.value)}
            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full ${errors.departmentDescription ? "border-rose-600" : "border-gray-300"}`}
            required
          ></input>
          {errors.departmentDescription && (
            <div className="text-rose-600"> {errors.departmentDescription} </div>
          )}
        </div>

        <div className="flex justify-center">
        <button className="flex justify-center  my-4 bg-blue-500 w-36 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={addOrUpdateDepartment}>
          Submit
        </button>
        </div>
      </form>
    </div>
  )
}

export default Department