import React, { useState } from "react";
import Navbar from "./Navbar";
const EditEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedCourses = checked
        ? [...formData.course, value]
        : formData.course.filter((course) => course !== value);
      setFormData({ ...formData, course: updatedCourses });
    } else if (type === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    // Add validation and server requests here
  };

  return (
    <div>
      <Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md flex flex-col  "
        >
          <div className="">
            {/* Name */}
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="name"
                className="text-lg  font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="email"
                className="text-lg  font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="mobile"
                className="text-lg  font-medium text-gray-600"
              >
                Mobile No
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="Enter your mobile number"
                className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>

            {/* Designation */}
            <div className="mb-4 flex justify-between items-center">
              <label className="text-lg  font-medium text-gray-600">
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              >
                <option value="" disabled>
                  Select Designation
                </option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/* Gender */}
            <div className="mb-4 flex justify-between items-center">
              <label className="text-lg  font-medium text-gray-600">
                Gender
              </label>
              <div className="flex gap-5">
                <label className="">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    required
                    className=" px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg "
                  />
                  <span>Male</span>
                </label>
                <label className="">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    required
                    className=""
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Course */}
            <div className="mb-4 flex justify-between items-center">
              <label className="text-lg  font-medium text-gray-600">
                Course
              </label>
              <div className="flex gap-5">
                {["MCA", "BCA", "BSC"].map((course) => (
                  <label key={course} className="">
                    <input
                      type="checkbox"
                      name="course"
                      value={course}
                      onChange={handleChange}
                      className=" px-4 py-2 mt-2 text-sm text-gray-800 "
                    />
                    <span>{course}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-4 flex justify-between items-center">
              <label
                htmlFor="file"
                className="text-lg  font-medium text-gray-600"
              >
                Image Upload
              </label>
              <input
                type="file"
                name="file"
                id="file"
                accept="image/jpeg, image/png"
                onChange={handleChange}
                required
                className=" px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-80 px-4 py-2 mt-2  text-gray-800 border text-lg font-medium bg-green-400 
                  rounded-lg  hover:border-black "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
