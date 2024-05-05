const express = require('express');
const router = express.Router();
const { SignUp } = require('../models/curricula');

router.use(express.json());

router.post('/login', async (req, res) => {
  const { u_name, password } = req.body;
  try {
    const user = await SignUp.findOne({ u_name });
    if (!user) {
      return res.status(400).json({ success: false, message: "User Not found" });
    }
    if (password === user.password) {
      if (user.isVerified) {
        return res.status(200).json({ success: true, message: "Login successful" });
      } else {
        return res.status(200).json({ success: true, message: "Please verify your account" });
      }
    }
    return res.status(400).json({ success: false, message: "Please try to login with the correct credentials" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
