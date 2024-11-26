import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import Navbar from "./Navbar";

const EmployeeForm = () => {
  const SERVER_URL = process.env.REACT_APP_VITE_API_URL;
  const navigate = useNavigate();

  const localStorageData = JSON.parse(localStorage.getItem("Profile"));
  const user_id = localStorageData?.user?._id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    file: null,
    created_by: user_id,
    imgUpload: undefined,
  });

  const [loading, setLoading] = useState(false);

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


  const postPicToServer = (pic) => {
    setLoading(true)
    if (pic === undefined) {
      console.log("Undefined")
      toast.error("Please Select an Image")
      return;
    }
    console.log(pic.type);
    if (pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/gif') {
      console.log('If Block');

      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'chatty');          // upload preset 
      data.append('cloud_name', 'dezifvepx');          // cloud name
      fetch('https://api.cloudinary.com/v1_1/dezifvepx/image/upload', {        // Cross Check the URL /image/upload reh gya shayad
        method: 'post',
        body: data

      }).then((res) => res.json()).then((data) => {
        // formData.imgUpload(data.url.toString());
        setFormData({ ...formData, imgUpload: data.url.toString() });
        console.log(data);
        toast.success("Image Uploaded Successfully To Cloudinary")
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      })
    } else {
      console.log('Else Block');
      toast.error("Please Select an Image")
      setLoading(false);
      return;
    }
  }


  const validate = () => {
    const {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    } = formData;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      toast.error("Invalid mobile number");
      return false;
    }

    if (!designation) {
      toast.error("Designation is required");
      return false;
    }

    if (!gender) {
      toast.error("Gender is required");
      return false;
    }

    if (course.length === 0) {
      toast.error("At least one course must be selected");
      return false;
    }



    return true;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    console.log("Form Submitted: ", formData);
    // Add validation and server requests here
    await axios
      .post(`${SERVER_URL}/api/v1/employee/add-emp`, formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          toast.success(response.data.message)
          navigate("/allEmployee");
        } else {
          toast.error("Something went wrong")
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong")
      });
  };



  return (
    <div>
      <Navbar />
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
                type="tel"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                name="mobile"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="Enter 10 digit mobile number exp: 1234567890" 
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
                    value="M"
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
                    value="F"
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
                accept="image/*"
                onChange={(e) => postPicToServer(e.target.files[0])}
                required
                className=" px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              loading={loading}
              className="w-full px-4 py-2 mt-2  text-gray-800 border text-lg font-medium bg-green-400 
                  rounded-lg  hover:border-black "
              onClick={handleSubmit}
            >
              {loading ? "Uploading..." : "Save"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EmployeeForm;
