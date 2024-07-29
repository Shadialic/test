const EmpDb = require("../model/employeeModel");
const { uploadToCloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");

const addEmployee = async (req, res) => {
  try {
    const { email, fullName, mobile, designation, gender, courses } = req.body;
    const img = req.file ? req.file.path : null;
    if (
      !email ||
      !fullName ||
      !mobile ||
      !designation ||
      !gender ||
      !courses ||
      !img
    ) {
      return res.json({
        status: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        status: false,
        message: "Invalid email format",
      });
    }

    if (isNaN(mobile)) {
      return res.json({
        status: false,
        message: "Mobile number must be numeric",
      });
    }
    const existingEmployee = await EmpDb.findOne({ email });
    if (existingEmployee) {
      return res.json({
        status: false,
        message: "Email already in use",
      });
    }
    const data = await uploadToCloudinary(img, "admin");
    const employee = new EmpDb({
      email: email,
      name: fullName,
      phone: mobile,
      designation: designation,
      gender: gender,
      course: courses,
      image: data.url,
    });
    const savedEmployeeData = await employee.save();
    return res.status(201).json({
      savedEmployeeData,
      message: "Employee added successfully",
      status: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const getEmployee = async (req, res) => {
  try {
    const data = await EmpDb.find();
    res.status(200).json({
      status: true,
      data,
      message: "Successfully completed",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching employees",
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { _id, email, fullName, mobile, designation, gender, courses } =
      req.body;
    const img = req.file ? req.file.path : null;
    if (!email || !fullName || !mobile || !designation || !gender || !courses) {
      return res.json({
        status: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        status: false,
        message: "Invalid email format",
      });
    }
    if (isNaN(mobile)) {
      return res.json({
        status: false,
        message: "Mobile number must be numeric",
      });
    }
    const existingEmail = await EmpDb.findOne({ email, _id: { $ne: _id } });
    if (existingEmail) {
      return res.json({
        status: false,
        message: "Email is already in use",
      });
    }
    const data = img ? await uploadToCloudinary(img, "admin") : null;
    const existingEmployee = await EmpDb.findOne({ _id });
    if (!existingEmployee) {
      return res.json({
        status: false,
        message: "Employee not found",
      });
    }
    const updateData = await EmpDb.findOneAndUpdate(
      { _id },
      {
        email: email,
        name: fullName,
        phone: mobile,
        designation: designation,
        gender: gender,
        course: courses,
        image: data ? data.url : existingEmployee.image,
      },
      { new: true }
    );
    res.json({ status: true, updateData, alert: "Employee is updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({
        status: false,
        message: "Invalid employee ID format",
      });
    }
    const existingEmployee = await EmpDb.findById(id);
    if (!existingEmployee) {
      return res.status(404).json({
        status: false,
        message: "Employee not found",
      });
    }
    await EmpDb.findByIdAndDelete(id);
    const data = await EmpDb.find();
    return res.json({
      data,
      status: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addEmployee,
  getEmployee,
  editEmployee,
  deleteEmployee,
};
