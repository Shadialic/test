const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
  },
  designation: {
    type: String,
  },
  gender: {
    type: String,
  },
  course: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const employee = mongoose.model("Employees", employeeSchema);
module.exports = employee;
