const express = require('express');
const router = express.Router();
const { Department } = require('../models/curricula');

// Create department
router.post('/new-department', async (req, res) => {
  try {
    const { name, vision, mission, year } = req.body;

    const department = new Department({ name, vision, mission, year });
    const result = await department.save();

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error inserting into the department collection:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all departments
router.get('/all-departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    console.error('Error retrieving departments:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get department by name
router.get('/get-department/:name', async (req, res) => {
  try {
    const departmentName = req.params.name;
    const department = await Department.findOne({ name: departmentName });

    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found.' });
    }

    res.status(200).json({ success: true, data: department });
  } catch (error) {
    console.error('Error retrieving department by name:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete department by name
router.delete('/delete-department/:name', async (req, res) => {
  try {
    const departmentName = req.params.name;
    const deletedDepartment = await Department.findOneAndDelete({ name: departmentName });

    if (!deletedDepartment) {
      return res.status(404).json({ success: false, error: 'Department not found.' });
    }

    res.status(200).json({ success: true, data: deletedDepartment });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
