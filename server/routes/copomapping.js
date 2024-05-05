const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { COPOMapping, PO, CO } = require('../models/curricula');

// Route to create a new copo mapping
router.post('/new-copomapping', async (req, res) => {
  try {
    const { coId, poId } = req.body;
    // Create the new copo mapping
    const newCOPOMapping = new COPOMapping({
      coId,
      poId
    });

    // Save the new copo mapping to the database
    await newCOPOMapping.save();

    // Return the new copo mapping
    res.status(201).json(newCOPOMapping);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all copo mappings
router.get('/all-copomappings', async (req, res) => {
  try {
    const copoMappings = await COPOMapping.find();
    res.status(200).json(copoMappings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a COPOMapping
router.delete('/delete/:coId/:poId', async (req, res) => {
  const { coId, poId } = req.params;
  try {
    // Find the COPOMapping by coId and poId and delete it
    const deletedCOPOMapping = await COPOMapping.findOneAndDelete({ coId, poId });
    if (!deletedCOPOMapping) {
      return res.status(404).json({ message: "COPOMapping not found" });
    }
    res.status(200).json(deletedCOPOMapping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
