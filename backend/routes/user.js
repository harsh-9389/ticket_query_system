const express = require('express');
const Complaint = require('../models/Complaint');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a complaint
router.post('/complaints', authMiddleware, async (req, res) => {
    const { title, description } = req.body;
    try {
        const complaint = new Complaint({
            title,
            description,
            createdBy: req.user.id,
        });
        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
