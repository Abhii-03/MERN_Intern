const express = require("express");
const router = express.Router();

const {
    addEmployee,
    getAllEmployees,
    getEmployeeSingle,
    editEmployeeSingle,
    deleteEmployee
} = require("../controllers/Employee");

router.post("/add-emp", addEmployee);
router.get("/get-emp-all/:id", getAllEmployees);
router.get("/get-emp/:id", getEmployeeSingle);
router.patch("/edit-emp/:id", editEmployeeSingle);
router.delete("/delete-emp/:id", deleteEmployee);

module.exports = router;
