import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setSignupData } from "../slices/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SERVER_URL = process.env.REACT_APP_VITE_API_URL;
  console.log(SERVER_URL);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  //   const[showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formData.createPassword !== formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    await axios
      .post(`${SERVER_URL}/api/v1/user/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.createPassword,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("Profile", JSON.stringify(res?.data?.result));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(data);
    // console.log(data?.result);

    //  navigate("/dashboard");
  };

 

  return (
    <div className="container">
      <div className=" flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md flex flex-col"
        >
          
          <div className="mb-4 flex justify-between items-center">
            <label
              htmlFor="name"
              className="text-lg  font-medium text-gray-600"
            >
              User Name <sup className="text-red-500">*</sup>
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
              onChange={changeHandler}
              className="w-72 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>

         
          <div className="mb-4 flex justify-between items-center">
            <label
              htmlFor="email"
              className="text-lg  font-medium text-gray-600"
            >
              Email Address <sup className="text-red-500">*</sup>
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={changeHandler}
              className="w-72 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>

        
          <div className="mb-4 flex justify-between items-center">
            <label
              htmlFor="createPassword"
              className="text-lg  font-medium text-gray-600"
            >
              Password <sup className="text-red-500">*</sup>
            </label>
            <input
              required
              type="password"
              id="createPassword"
              name="createPassword"
              value={formData.createPassword}
              placeholder="Enter your password"
              onChange={changeHandler}
              className="w-72 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>

          
          <div className="mb-4 flex justify-between items-center">
            <label
              htmlFor="confirmPassword"
              className="text-lg  font-medium text-gray-600"
            >
              Confirm Password <sup className="text-red-500">*</sup>
            </label>
            <input
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm your password"
              onChange={changeHandler}
              className="w-72 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>

        
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Signup
          </button>
        </form>

      </div>
    </div>
  );
};

export default Signup;
