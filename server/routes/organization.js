const express = require("express");
const router = express.Router();
const { Organization } = require("../models/curricula");

// Create organization
router.post("/new-organization", async (req, res) => {
    try {
        const data = req.body;
        const newOrganization = await Organization.create(data);
        res.json(newOrganization);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get organization by name
router.get("/get-organization/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const organization = await Organization.findOne({ name });
        
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        res.json(organization);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
