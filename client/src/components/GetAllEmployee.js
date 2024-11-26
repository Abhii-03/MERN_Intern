import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "./Navbar";
import EditModal from "./EditModal";

const GetAllEmployee = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [NoEmployeeFound, setNoEmployeeFound] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const SERVER_URL = process.env.REACT_APP_VITE_API_URL;
  const localStorageData = JSON.parse(localStorage.getItem("Profile"));
  const user_id = localStorageData?.user?._id;

  const getAllEmployees = async () => {
    const { data } = await axios.get(
      `${SERVER_URL}/api/v1/employee/get-emp-all/${user_id}?search=${searchTerm}`
    );
    if (data.success) {
      setEmployees(data.result);
    } else {
      console.error("Error: ", data.message);
    }
  };

  const createHandler = () => {
    navigate("/employee");
  };

  useEffect(() => {
    getAllEmployees();
  }, []);


  const handleSearch = async () => {

    if (!searchTerm.trim()) {
      toast.error("Please enter a search keyword");
      return;
    }

    if (searchTerm.trim()) {
      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/v1/employee/search-employees/${user_id}?search=${searchTerm}`
        );
        if (data.success) {
          setEmployees(data.result);
        }
      } catch (error) {
        setNoEmployeeFound(true);
        console.error("Error while searching employees: ", error.message);
      }
    } else {
      setNoEmployeeFound(true);
    }
  };




  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };



  const handleSelectDelete = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");

    if (confirmDelete) {
      await axios.delete(`${SERVER_URL}/api/v1/employee/delete-emp/${selectedEmployee._id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            toast.success('Employee deleted successfully!');
            getAllEmployees();
          } else {
            toast.error('Error: ' + data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('Something went wrong');
        })
    }
  };







  return (
    <div>
      <Navbar />

      {/* Conditional Modal */}
      {isModalOpen && (
        <EditModal
          employee={selectedEmployee}
          handleCloseModal={handleCloseModal}
          getAllEmployees={getAllEmployees}
          selectedEmployee={selectedEmployee}

        />
      )}


      <div className="w-full h-full flex flex-col mx-auto px-5  lg:px-0">
        {employees.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full mt-20">
            <p className="text-2xl font-semibold text-gray-700 mb-4">
              No employee exist!
            </p>
            <button
              onClick={createHandler}
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 shadow-md"
            >
              Create Employee
            </button>
          </div>
        ) : (

          !NoEmployeeFound ?
            <>
              <div className="flex justify-center gap-28 items-center px-4 mt-6">
                <div>
                  <span className=" font-semibold  text-lg text-gray-700">
                    Total Count: {employees.length}
                  </span>
                </div>
                <button
                  onClick={createHandler}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 shadow-lg transition duration-200"
                >
                  Create Employee
                </button>
              </div>

              <div className="flex items-center justify-between bg-yellow-200 py-4 px-6 mt-4 rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Search</span>
                  <input
                    type="search"
                    placeholder="Enter Search Keyword"
                    className="w-72 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-10">

                  <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
                  >
                    Search
                  </button>

                  <button
                    onClick={getAllEmployees}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-200 shadow-md"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto w-full mt-6">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-yellow-300 text-left text-gray-800 font-semibold">
                      <th className="px-4 py-3 border">Unique ID</th>
                      <th className="px-4 py-3 border">Image</th>
                      <th className="px-4 py-3 border">Name</th>
                      <th className="px-4 py-3 border">Email</th>
                      <th className="px-4 py-3 border">Mobile No</th>
                      <th className="px-4 py-3 border">Designation</th>
                      <th className="px-4 py-3 border">Gender</th>
                      <th className="px-4 py-3 border">Course</th>
                      <th className="px-4 py-3 border">Create Date</th>
                      <th className="px-4 py-3 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr
                        key={emp.uniqueId}
                        className="hover:bg-gray-100 transition duration-150"
                      >
                        <td className="px-4 py-3 border">{emp._id}</td>
                        <td className="px-4 py-3 border text-center">
                          <img
                            src={emp.imgUpload || `https://ui-avatars.com/api/?name=${emp.name}`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full mx-auto"
                          />
                        </td>
                        <td className="px-4 py-3 border">{emp.name}</td>
                        <td className="px-4 py-3 border">
                          <a
                            href={`mailto:${emp.email}`}
                            className="text-blue-500 underline hover:text-blue-700"
                          >
                            {emp.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 border">{emp.mobile}</td>
                        <td className="px-4 py-3 border">{emp.designation}</td>
                        <td className="px-4 py-3 border">{emp.gender}</td>
                        <td className="px-4 py-3 border">{emp.course}</td>
                        <td className="px-4 py-3 border">
                          {new Date(emp.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 border flex gap-2">
                          <button
                            onClick={() => handleEdit(emp)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition shadow"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              handleSelectDelete(emp);
                              if (selectedEmployee) {
                                handleDelete();
                              }
                            }}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition shadow"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
            :
            <div className="flex flex-col items-center justify-center h-full mt-20">
              <p className="text-2xl font-semibold text-gray-700 mb-4">
                No employee found!
              </p>
              <button
                onClick={() => setNoEmployeeFound(false)}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 shadow-md"
              >
                Back
              </button>
            </div>

        )}
      </div>

    </div>
  );
};

export default GetAllEmployee;
