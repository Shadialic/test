const db = require("../model/db");
const checkout = async (req, res) => {
  console.log(req.body);
  const { name, contact, email, address } = req.body;

  try {
    if (!name || !contact || !email || !address) {
      return res.json({ message: "All fields are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ message: "Invalid email format." });
    }
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      return res.json({
        message: "Invalid contact number. It should be 10 digits.",
      });
    }
    const chekingData = new db({
        name: name,
        email,
        contact: contact || "000000000000",
        address: address,
      });
      const data = await chekingData.save();
    return res.json({ message: "Data saved successfully." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

module.exports = checkout;
