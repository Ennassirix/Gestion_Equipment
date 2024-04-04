const express = require('express');
const router = express.Router();
const trackModels = require('../Models/TrackEquipmentsModels');


router.post('/api/createTrack', async (req, res) => {
    try {
        const data = {
            equipment_id: req.body.equipment_id,
            employee_id: req.body.employee_id,
            atelier_id: req.body.atelier_id,
            date_issued: req.body.date_issued,
            quantity_issued: req.body.quantity_issued
        }
        const tracks = await trackModels.createEquipmentTrack(data);
        res.status(201).json(tracks);
    } catch (error) {
        console.error('Failed to create an Track');
        res.status(500).json({ error: 'Failed to create an Track' });
    }
})


router.get('/api/getAllTrack', async (req,res) => {
    try {
        const tracks = await trackModels.getAllTracks();
        res.status(201).json(tracks);
    } catch (error) {
        console.error('Failed to get all Tracks');
        res.status(500).json({ error: 'Failed to get all Tracks' });
    }
})









module.exports = router;