const mongoose = require("mongoose");
const Employee = require("../models/Employee.js");

// Add Employee
exports.addEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course, created_by } = req.body;

  if (!name || !email || !mobile || !designation || !gender || !course) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });
  }

  if (!created_by) {
    return res.status(400).json({
      success: false,
      message: "Please login to add employee",
    });
  }

  const EmployeeAlreadyExists = await Employee.findOne({ email });
  if (EmployeeAlreadyExists) {
    return res.status(400).json({
      success: false,
      message: "Employee already exists",
    });
  }

  try {
    const AddEmployeeDB = await Employee.create({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      created_by,
    });

    return res.status(200).json({
      success: true,
      message: "Employee Added Successfully",
      result: AddEmployeeDB,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const employees = await Employee.find({ created_by : _id });
    if (!employees || employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employees retrieved successfully",
      result: employees,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Get Single Employee
exports.getEmployeeSingle = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid employee ID",
    });
  }

  try {
    const employee = await Employee.findById(_id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      result: employee,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Edit Employee
exports.editEmployeeSingle = async (req, res) => {
  const { id: _id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid employee ID",
    });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      _id,
      { $set: { name, email, mobile, designation, gender, course } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found or update failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      result: updatedEmployee,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid employee ID",
    });
  }

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(_id);
    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found or deletion failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      result: deletedEmployee,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
