const bcrypt = require("bcrypt");
const AdminDb = require("../model/adminModel");
const { createSecretToken } = require("../utils/SecretToken");


const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (err) {
    console.log(err);
  }
};

const addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body.formData;
    const spassword = await securePassword(password);
    const exist = await AdminDb.findOne({ email: email });
    if (exist) {
      res.json({ alert: "email already exists", status: false });
    } else {
      const admin = new AdminDb({
        email: email,
        password: spassword,
      });
      const saveUserData = await admin.save();
      const token = createSecretToken(saveUserData._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      return res.status(201).json({
        saveUserData,
        alert: "please verify your email",
        status: true,
        token,
      });
    }
  } catch (err) {
    res.status(500).json({ alert: "Internal Server Error" });
  }
};
const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body.formData;
    const exist = await AdminDb.findOne({ email: email });
    if (exist) {
      if (password && exist.password) {
        const compared = await bcrypt.compare(password, exist.password);
        if (compared) {
            const token = createSecretToken(exist._id,exist.name);
            res.cookie("token", token, {
              withCredentials: true,
              httpOnly: false,
            });
            res.json({
              userData: exist,
              status: true,
              err: null,
              token,
            });
        } else {
          res.json({ alert: "Entered password is incorrect!" });
        }
      } else {
        res.json({ alert: "Password or existing password is undefined!" });
      }
    } else {
      res.json({ alert: "Email not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ alert: "Internal Server Error" });
  }
};
module.exports = {
  addAdmin,
  verifyLogin,
};
