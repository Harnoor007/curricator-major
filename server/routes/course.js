// Import necessary modules
const express = require('express');
const router = express.Router();
const { Course, Department, Curriculum } = require('../models/curricula');

// Route to get all courses
router.get('/all-courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new course
router.post('/new-course', async (req, res) => {
  const { code, title, coreElective, credits, totalMarks, courseOwner, type, departmentId, curriculumId, hours } = req.body;

  try {
    // console.log(courseOwner)
    // console.log(curriculumId)
    // Check if the department with the given name exists
    const department = await Department.findOne({ name: departmentId });
    if (!department) {
        return res.status(400).json({ message: `Department '${departmentId}' does not exist` });
    }
    
    // Check if the curriculum with the given name exists in the department
    const curriculum = await Curriculum.findOne({ name: curriculumId });
    if (!curriculum) {
        return res.status(400).json({ message: `Curriculum '${curriculumId}' does not exist in department '${departmentId}'` });
    }
    // console.log(departmentId)

    // Create the new course
    const newCourse = new Course({
      code,
      title,
      coreElective,
      credits,
      totalMarks,
      courseOwner,
      type,
      departmentId: department._id,
      hours,
      curriculumId: curriculum._id,
    });
    // Save the new course
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a course
// Route to delete a course
router.delete('/delete-course/:code', async (req, res) => {
  try {
    const deletedCourse = await Course.findOneAndDelete({ code: req.params.code });
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found.' });
    }
    res.json({ message: 'Course deleted', deletedCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;