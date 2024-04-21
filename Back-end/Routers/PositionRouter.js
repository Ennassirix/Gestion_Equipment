const express = require('express')
const router = express();
const positionModels = require('../Models/PositionModels');


// api/allPosition
router.get('/api/allPosition', async (req, res) => {
    try {
        const position = await positionModels.getAllPosition()
        res.status(200).json(position);
    } catch (error) {
        console.error('Failed to get all position');
        res.status(500).json({ error: 'Failed to get all position' });
    }
})
// /api/position/:id
router.get('/api/position/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const position = await positionModels.getPositionByID(id);
        res.status(200).json(position);
    } catch (error) {
        console.error('Failed to get  position by id');
        res.status(500).json({ error: 'Failed to get  position by id' });
    }
})
router.put('/api/position/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = {
            position_name: req.body.position_name
        }
        const position = await positionModels.updatePosition(data, id)
        res.status(200).json(position);
    } catch (error) {
        console.error('Failed to update all position');
        res.status(500).json({ error: 'Failed to update all position' });
    }
})
router.delete('/api/position/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const position = await positionModels.deletePosition(id)
        res.status(200).json(position);
    } catch (error) {
        console.error('Failed to delete all position');
        res.status(500).json({ error: 'Failed to delete all position' });
    }
})

router.post('/api/createPosition', async (req, res) => {
    try {
        const existingPosition = await positionModels.getPositionByName(req.body.position_name);
        if (existingPosition) {
            return res.status(500).json({ error: 'Position already exists' });
        }

        const data = {
            position_name: req.body.position_name
        };

        const newPosition = await positionModels.createPosition(data);
        res.status(200).json(newPosition);
    } catch (error) {
        console.error('Failed to create position:', error);
        res.status(500).json({ error: 'Failed to create position' });
    }
});



// router.post('/api/createPosition', async (req, res) => {
//     try {
//         const data = {
//             position_name: req.body.position_name
//         }
//         const position = await positionModels.createPosition(data)
//         res.status(200).json(position);
//     } catch (error) {
//         console.error('Failed to create all position');
//         res.status(500).json({ error: 'Failed to create all position' });
//     }
// })

module.exports = router;


