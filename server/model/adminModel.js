const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
 
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: String,
    default: false,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
 

});
const admin = mongoose.model("Admin", adminSchema);
module.exports = admin;
