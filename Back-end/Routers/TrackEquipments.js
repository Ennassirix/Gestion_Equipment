const express = require('express');
const router = express.Router();
const trackModels = require('../Models/TrackEquipmentsModels');


router.post('/api/createTrack', async (req, res) => {
    const date = new Date(); // Create a new Date object
    try {
        // Validate request data
        const { code, ref, equipment_name, employee_name, atelier_name, position_name, quantity } = req.body;
        if (!code || !ref || !equipment_name || !employee_name || !atelier_name || !position_name || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create track
        const created_date = date.toISOString().slice(0, 19).replace('T', ' '); // Format the date
        const data = { code, ref, equipment_name, employee_name, atelier_name, position_name, quantity, created_date };
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

router.post('/api/filter', async (req, res) => { // Changed to POST method
    try {
        const data = {
            code: req.body.code,
            employee_name: req.body.employee_name,
            atelier_name: req.body.atelier_name,
            created_date: req.body.created_date
        };

        const tracks = await trackModels.searchTracks(data);
        res.json(tracks);
    } catch (error) {
        console.error('Failed to filter tracks:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to filter tracks' });
    }
});








module.exports = router;