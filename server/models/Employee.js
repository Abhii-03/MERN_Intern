const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    // unique: true,
  },
  designation: {
    type: String,
    required: true,
    enum: ["HR", "Manager", "Sales"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"], // Male or Female
  },
  course: {
    type: [String],
    required: true,
    enum: ["MCA", "BCA", "BSC"], 
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   imgUpload: {
  //     type: String, // Stores the file path or URL of the uploaded image
  //     required: true,
  //   },
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
