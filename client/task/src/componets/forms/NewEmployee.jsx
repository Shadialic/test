import { Button } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EmployeeData } from "../../api/api";

const NewEmployee = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        courses: checked
          ? [...prevData.courses, value]
          : prevData.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const employeeData = await EmployeeData(formData);
    if (employeeData.status) {
      toast.success(employeeData.message);
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        courses: [],
        image: null,
      });
      onClose();
    } else {
      toast.error(employeeData.message);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto mt-5 flex items-center justify-center">
          <div className="relative w-[80%] bg-white p-8 max-w-8xl max-h-2xl h-[80%] mx-auto rounded-lg shadow-md shadow-black">
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-700"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile No
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="male" className="mr-4">
                    Male
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Courses
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id="bca"
                    name="courses"
                    value="BCA"
                    checked={formData.courses.includes("BCA")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="bca" className="mr-4">
                    BCA
                  </label>
                  <input
                    type="checkbox"
                    id="mca"
                    name="courses"
                    value="MCA"
                    checked={formData.courses.includes("MCA")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="mca" className="mr-4">
                    MCA
                  </label>
                  <input
                    type="checkbox"
                    id="bsc"
                    name="courses"
                    value="BSC"
                    checked={formData.courses.includes("BSC")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="bsc">BSC</label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="w-full mt-7">
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-[#16b028] text-white w-full p-2 rounded-md"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </form>
    </div>
  );
};

export default NewEmployee;
