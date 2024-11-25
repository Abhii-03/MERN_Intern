import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  

  return (
    <div>
      
      <Navbar/>
      {/* Main Content */}
      <div className="flex justify-center place-items-center min-h-screen bg-gray-100">
        <h2 className="text-lg font-semibold">Welcome to the Admin Panel</h2>
      </div>
    </div>
  );
};

export default Dashboard;
