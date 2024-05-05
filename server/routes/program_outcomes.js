const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import the PO and Program models
const { Program, PO } = require('../models/curricula');

// Route to add a new program outcome (PO)
router.post('/new-po', async (req, res) => {
  try {
    const { programId, Program_Outcomes, PO_type } = req.body;
    const program = await Program.findOne({ name: programId });
    
    // Check if the program exists and if its name matches the provided programId
    if (!program || program.name !== programId) {
      return res.status(400).json({ message: 'Invalid programId.' });
    }
    const programOutcome = new PO({ programId : program._id, Program_Outcomes, PO_type });
    const newProgramOutcome = await programOutcome.save();
    res.status(201).json(newProgramOutcome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/all-pos', async (req, res) => {
  try {
    
    const programOutcomes = await PO.find();
    res.status(200).json(programOutcomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete-po/:id', async (req, res) => {
  try {
    const poId = req.params.id;

    // Find the program outcome by ID and delete it
    const deletedPO = await PO.findByIdAndDelete(poId);

    if (!deletedPO) {
      return res.status(404).json({ message: 'Program outcome not found.' });
    }

    res.status(200).json({ message: 'Program outcome deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
