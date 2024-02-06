import React, { useState, useEffect } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDepartments } from "../services/DepartmentService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if(id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function addOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
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

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    if (departmentId) {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Select Department";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container mx-auto mt-4 p-4">
      <h1 className="text-2xl font-bold mb-4">{pageTitle()}</h1>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name :</label>
          <input
            type="text"
            placeholder="Enter Employee First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full ${errors.firstName ? "border-rose-600" : "border-gray-300"}`}
            required
          ></input>
          {errors.firstName && (
            <div className="text-rose-600"> {errors.firstName} </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name :</label>
          <input
            type="text"
            placeholder="Enter Employee Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full ${errors.firstName ? "border-rose-600" : "border-gray-300"}`}
            required
          ></input>
          {errors.lastName && (
            <div className="text-rose-600"> {errors.lastName} </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email :</label>
          <input
            type="text"
            placeholder="Enter Employee Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full ${errors.firstName ? "border-rose-600" : "border-gray-300"}`}
            required
          ></input>
          {errors.email && (
            <div className="text-rose-600"> {errors.email} </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Department :</label>
          <select
            className={`border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full ${errors.firstName ? "border-rose-600" : "border-gray-300"}`}
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option value="Select Department">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {" "}
                {department.departmentName}
              </option>
            ))}
          </select>
          {errors.department && (
            <div className="text-rose-600"> {errors.department} </div>
          )}
        </div>
        <div className="flex justify-center">
        <button className="flex justify-center  my-4 bg-blue-500 w-36 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={addOrUpdateEmployee}>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeComponent;