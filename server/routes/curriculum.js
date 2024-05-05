  const express = require("express");
  const router = express.Router();
  const { Department, Program, Curriculum } = require("../models/curricula");

  // Create new curriculum
  router.post("/new-curriculum", async (req, res) => {
    try {
      const { name, departmentId, programId, from, to } = req.body;
      // Check if the referenced department exists before inserting
      const departmentExists = await Department.exists({ _id: departmentId });
      console.log(departmentExists);
      if (!departmentExists) {
        return res.status(400).json({ success: false, error: 'Referenced department does not exist.' });
      }
      
      // Check if the referenced program exists by programId  
      const programExists = await Program.exists({ _id: programId });
      if (!programExists) {
        console.log(`Program with ID '${programId}' not found`);
        return res.status(400).json({ success: false, error: 'Referenced program does not exist.' });
      }
      
      const curriculum = new Curriculum({
        name,
        departmentId,
        programId,
        from,
        to
      });
  
      // Save the curriculum document to the database
      const result = await curriculum.save();
  
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error inserting into the curriculum collection:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });  

  // Get all curricula
  router.get("/all-curriculums", async (req, res) => {
    try {
      const result = await Curriculum.find({});
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error retrieving curricula:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Get curriculum by ID
  router.get("/get-curriculum-by-id/:id", async (req, res) => {
    try {
      const curriculumId = req.params.id;
      const result = await Curriculum.findById(curriculumId);

      if (!result) {
        return res.status(404).json({ success: false, error: 'Curriculum not found.' });
      }

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error retrieving curriculum by ID:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Delete curriculum by ID
router.delete("/delete-curriculum/:id", async (req, res) => {
  try {
    const curriculumId = req.params.id;
    const result = await Curriculum.findByIdAndDelete(curriculumId);
    if (!result) {
      return res.status(404).json({ success: false, error: 'Curriculum not found.' });
    }
    res.status(200).json({ success: true, message: 'Curriculum deleted successfully.' });
  } catch (error) {
    console.error('Error deleting curriculum:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

  module.exports = router;
