const express = require('express');
const router = express.Router();
const trackModels = require('../Models/TrackEquipmentsModels');


router.post('/api/createTrack', async (req, res) => {
    try {
        // Validate request data
        const { equipment_id, employee_id, atelier_id, quantity_issued } = req.body;
        if (!equipment_id || !employee_id || !atelier_id || !quantity_issued) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create track
        const data = { equipment_id, employee_id, atelier_id, quantity_issued };
        const track = await trackModels.createEquipmentTrack(data);

        // Send success response
        res.status(200).json(track);
    } catch (error) {
        console.error('Failed to create a Track:', error);
        res.status(500).json({ error: 'Failed to create a Track', details: error.message });
    }
});



router.get('/api/getAllTrack', async (req, res) => {
    try {
        const tracks = await trackModels.getAllTracks();
        res.status(201).json(tracks);
    } catch (error) {
        console.error('Failed to get all Tracks');
        res.status(500).json({ error: 'Failed to get all Tracks' });
    }
})









module.exports = router;