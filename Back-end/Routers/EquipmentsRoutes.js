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
            equipment_name: req.body.equipment_name,
            quantity_available: req.body.quantity_available
        }
        const equipments = await equipmentModel.createAnEquipment(data)
        res.status(200).json(equipments)
    } catch (error) {
        res.status(500).json('Failed to create an equipments')
    }
})
// put
route.put('/api/equipment/:id', async (req, res) => {
    try {
        const data = {
            code: req.body.code,
            equipment_name: req.body.equipment_name,
            quantity_available: req.body.quantity_available
        }
        const id = req.params.id
        const equipments = await equipmentModel.updateAnEquipment(data, id)
        res.status(201).json(equipments)
    } catch (error) {
        res.status(500).json('Failed to update an equipments')
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


module.exports = route;