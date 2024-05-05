const express = require('express');
const router = express.Router();
const { SignUp } = require('../models/curricula');

router.use(express.json());

router.post('/login', async (req, res) => {
  console.log("hello")
  console.log(req.body)
  const { username, password } = req.body;
  try {
    const user = await SignUp.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "User Not found" });
    }
    if (password === user.password) {
        return res.status(200).json({ success: true, message: "Login successful" });
    }
    return res.status(400).json({ success: false, message: "Please try to login with the correct credentials" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
