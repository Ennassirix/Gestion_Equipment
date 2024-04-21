const express = require('express')
const route = express.Router()
const equipmentModel = require('../Models/EquipmentsModels')

// api/getAllEquipments
route.get('/api/getAllEquipments', async (req, res) => {
    try {

        const equipments = await equipmentModel.getAllEquipment()
        res.status(200).json(equipments);
    } catch (error) {
        res.status(500).json('Failed to get all equipments')
    }
})
// api/getAnEquipment/:id
route.get('/api/getAnEquipment/:id', async (req, res) => {
    try {
        const id = req.params.id
        const equipment = await equipmentModel.getAnEquipmentByID(id)
        res.status(201).json(equipment)
    } catch (error) {
        res.status(500).json('Failed to get an equipment by id')
    }
})
// api/equipment
route.post('/api/equipment', async (req, res) => {
    try {
        const data = {
            code: req.body.code,
            ref: req.body.ref,
            equipment_name: req.body.equipment_name,
            quantity_available: req.body.quantity_available,
            position_name: req.body.position_name
        };
        const equipmentId = await equipmentModel.createAnEquipment(data);
        res.status(200).json({ equipmentId });
    } catch (error) {
        console.error('Failed to create an equipment:', error);
        res.status(500).json('Failed to create an equipment');
    }
});

// put
route.put('/api/equipment/:id', async (req, res) => {
    try {
        const data = {
            code: req.body.code,
            ref: req.body.ref,
            equipment_name: req.body.equipment_name,
            quantity_available: req.body.quantity_available,
            position_name: req.body.position_name
        }
        const id = req.params.id
        const equipments = await equipmentModel.updateAnEquipment(data, id)
        res.status(200).json(equipments)
    } catch (error) {
        res.status(500).json('Failed to update an equipments')
    }
})

// update qts
route.put('/api/update/quantity/:id', async (req, res) => {
    try {
        const data = {
            quantity_available: req.body.quantity_available
        }
        const id = req.params.id
        const equipment = await equipmentModel.updateQuantity(data, id)
        res.status(200).json(equipment)
    } catch (error) {
        res.status(500).json('Failed to update the qts')

    }
})


// delete
route.delete('/api/equipment/:id', async (req, res) => {
    try {
        const id = req.params.id
        const equipments = await equipmentModel.deleteAnEquipment(id)
        res.status(201).json(equipments)
    } catch (error) {
        res.status(500).json('Failed to delete an equipments')
    }
})



route.get('/api/notification', async (req, res) => {
    try {
        const notifications = await equipmentModel.monitorEquipmentQuantity(); // Call the monitoring function
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error triggering equipment quantity monitoring:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = route;