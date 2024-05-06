const mongoose = require('mongoose');
const SignUp = require('../models/curricula').SignUp
require('dotenv').config();
// MongoDB connection URL
const mongoURI = process.env.MONGO_URI;



const db = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected mongodb successfully")

    const userCount = await SignUp.countDocuments({});
    if (userCount === 0) {
      await initializeAdminCredentials();
    }


  } catch (error) {
    console.log("Some error occured", error)
  }
}

async function initializeAdminCredentials() {
  try {
      const adminCredentials = new SignUp({
          username: 'Admin',
          role: 'SuperAdmin',
          password: '$2b$10$Ic1aWmmauO7H.sJqZhD1cO8rSiMOe9tPisZRxsH9IHiwIyTSjogZC'
      });
      await adminCredentials.save();
      console.log("Initialized admin credentials collection with a document");
  } catch (error) {
      console.error("Error initializing admin credentials collection:", error);
  }
}

module.exports = db
