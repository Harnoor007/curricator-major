const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const { SignUp } = require('../models/curricula');
const JWT_Token = process.env.JWT_TOKEN;


router.use(express.json());





// router.post('/login', async (req, res) => {
//   console.log(req.body)
//   const { username, password } = req.body;
//   try {
//     const user = await SignUp.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "User Not found" });
//     }
//     if (password === user.password) {
//         return res.status(200).json({ success: true, message: "Login successful" });
//     }
//     return res.status(400).json({ success: false, message: "Please try to login with the correct credentials" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });


router.post('/login', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: "Invalid Credentials", errors: errors.array() });
  }

  const { username, password } = req.body;
  const user = await SignUp.findOne({ username });

  if (!user) {
    return res.status(400).json({ success: false, message: "User Not found" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (passwordCompare) {
    let roleSpecificData;


    {/* if (user.role === 'superadmin') {
      roleSpecificData = {
        id: user.id,
        role: 'superadmin',
      };
    } else if (user.role === 'admin') {
      roleSpecificData = {
        id: user.id,
        role: 'admin',
      };
    }
    else {
      roleSpecificData = {
        id: user.id,
        role: 'user',
      };
    }

    

    if (user.isVerified === true) {
    } else {
      return res.status(200).json({ success: true, message: "verify" });
    }
  
*/}
      const data = {
        username: user.username,
        role : user.role,
      };
      const authToken = jwt.sign(data, JWT_Token);
  
      return res.status(200).json({ success: true, authToken: authToken, body: data , message:"Successfully logined" });
    }
      return res.status(400).json({ success: false, message: "Please try to login with the correct credentials" });
});



module.exports = router;
