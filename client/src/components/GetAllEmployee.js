import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import Navbar from "./Navbar";
import EditModal from "./EditModal";

const GetAllEmployee = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const SERVER_URL = process.env.REACT_APP_VITE_API_URL;
  const localStorageData = JSON.parse(localStorage.getItem("Profile"));
  const user_id = localStorageData?.user?._id;

  const getAllEmployees = async () => {
    const { data } = await axios.get(
      `${SERVER_URL}/api/v1/employee/get-emp-all/${user_id}`
    );
    if (data.success) {
      setEmployees(data.result);
    } else {
      console.error("Error: ", data.message);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const createHandler = () => {
    navigate("/employee");
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
          <>
            <div className="flex justify-end gap-2 items-center px-4 mt-4">
              <div>
                <span className="font-medium">
                  Total Count: {employees.length}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={createHandler}
                  className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 shadow-md"
                >
                  Create Employee
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 bg-yellow-300">
              <span className="font-medium">Search</span>
              <input
                type="search"
                placeholder="Enter Search Keyword"
                className="w-[360px] px-3 border border-gray-300 rounded focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-yellow-300 text-left">
                    <th className="px-4 py-2 border border-gray-300">Unique ID</th>
                    <th className="px-4 py-2 border border-gray-300">Image</th>
                    <th className="px-4 py-2 border border-gray-300">Name</th>
                    <th className="px-4 py-2 border border-gray-300">Email</th>
                    <th className="px-4 py-2 border border-gray-300">Mobile No</th>
                    <th className="px-4 py-2 border border-gray-300">Designation</th>
                    <th className="px-4 py-2 border border-gray-300">Gender</th>
                    <th className="px-4 py-2 border border-gray-300">Course</th>
                    <th className="px-4 py-2 border border-gray-300">Create Date</th>
                    <th className="px-4 py-2 border border-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.uniqueId} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300">
                        {emp._id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <img
                          src={"https://ui-avatars.com/api/?name=" + emp.name}
                          alt="Profile"
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {emp.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <a
                          href={`mailto:${emp.email}`}
                          className="text-blue-500 underline"
                        >
                          {emp.email}
                        </a>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {emp.mobile}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {emp.designation}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {emp.gender}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {emp.course}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {new Date(emp.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-10 py-2 border border-gray-300">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={async () => {
                            handleSelectDelete(emp);
                            if (selectedEmployee) {
                              handleDelete();
                            }
                          }}
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
        )}
      </div>

    </div>
  );
};

export default GetAllEmployee;
