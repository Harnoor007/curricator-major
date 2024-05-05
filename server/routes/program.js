const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const { Program, Department } = require("../models/curricula");

// Create program
router.post("/new-program", async (req, res) => {
  try {
    const { name, owner, description, department } = req.body;

    // Check if the department exists by name
    const existingDepartment = await Department.findOne({ name: department });

    if (!existingDepartment) {
      return res.status(400).json({ success: false, error: 'Department does not exist.' });
    }

    // Create a new program document with departmentId referencing the existing department
    const program = new Program({ name, owner, description, department, departmentId: existingDepartment._id });
    
    // Save the program document to the database
    const result = await program.save();

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error inserting into the program collection:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get program by name
router.get("/get-program/:name", async (req, res) => {
  try {
    const programName = req.params.name;

    // Find the program by name
    const program = await Program.findOne({ name: programName });

    if (!program) {
      return res.status(404).json({ success: false, error: 'Program not found.' });
    }

    res.status(200).json({ success: true, data: program });
  } catch (error) {
    console.error('Error fetching program by name:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all programs
router.get("/all-programs", async (req, res) => {
  try {
    // Find all programs in the database
    const programs = await Program.find();

    res.status(200).json({ success: true, data: programs });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/delete-program/:name', async (req, res) => {
  try {
    const programName = req.params.name;
    const deletedProgram = await Program.findOneAndDelete({ name: programName });

    if (!deletedProgram) {
      return res.status(404).json({ success: false, error: 'Program not found.' });
    }

    res.status(200).json({ success: true, data: deletedProgram });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;