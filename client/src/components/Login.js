import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const SERVER_URL = process.env.REACT_APP_VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("vekhay si jado m ");

    if (!email || !password) {
      alert("Both fields are required!");
      return;
    }

    await axios
      .post(`${SERVER_URL}/api/v1/user/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("Profile", JSON.stringify(res?.data?.result));
        navigate("/dashboard");
      })
      .catch((err) => {
        
        toast.error("invailid Details");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md flex flex-col"
      >
        <div className="mb-4 flex justify-between items-center">
          <label
            htmlFor="email"
            className=" text-lg  font-medium text-gray-600"
          >
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label
            htmlFor="password"
            className=" text-lg font-medium text-gray-600"
          >
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-80 px-4 py-2 mt-2 text-sm text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
          
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
