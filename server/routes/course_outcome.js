// Import necessary modules
const express = require('express');
const router = express.Router();
const { Course, CO } = require('../models/curricula');

router.get('/all-course-outcomes', async (req, res) => {
    try {
      // Fetch all course outcomes from the database
      const courseOutcomes = await CO.find();
      res.json(courseOutcomes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post('/new-course-outcome', async (req, res) => {
    const { courseId, content, bloomsLevel } = req.body;
  
    try {
      // Check if the courseId exists in the Course model
      const course = await Course.findOne({ code: courseId });
      if (!course) {
        return res.status(400).json({ message: `Course with code '${courseId}' not found` });
      }
  
      // Create the new course outcome
      const newCourseOutcome = new CO({
        courseId: course._id,
        content,
        bloomsLevel
      });
  
      // Save the new course outcome to the database
      await newCourseOutcome.save();
  
      // Return the new course outcome
      res.status(201).json(newCourseOutcome);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      // Delete the course outcome with the provided id
      await CO.findByIdAndDelete(id);
      res.status(200).json({ message: 'Course outcome deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });  

module.exports = router;
