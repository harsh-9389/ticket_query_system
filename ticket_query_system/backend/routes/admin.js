const express = require('express');
const Complaint = require('../models/Complaint');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all complaints
router.get('/complaints', authMiddleware, async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('createdBy assignedTo');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Assign complaint
router.put('/complaints/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { assignedTo, status } = req.body;
    try {
        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { assignedTo, status },
            { new: true }
        );
        res.json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
