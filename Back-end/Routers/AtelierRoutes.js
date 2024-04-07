const express = require('express')
const router = express.Router()
const atelierModels = require('../Models/AtelierModels')

// /api/allatelier

router.get('/api/allAtelier',async (req,res)=>{
    try {
        const atelier = await atelierModels.getAllAtelier()
        res.status(201).json(atelier)
    } catch (error) {
        res.status(500).json("Failed to get all atelier");
    }
})

// /api/atelier/:id
// http://localhost:3001/atelier/api/atelier/1
router.get('/api/atelier/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const atelier = await atelierModels.getAtelierByID(id)
        res.status(200).json(atelier)
    } catch (error) {
        res.status(500).json("Failed to get an atelier");

    }
})
// /api/createAtelier
router.post('/api/createAtelier',async (req,res)=>{
    try {
        const data = {
            atelier_name : req.body.atelier_name
        }
        const atelier = await atelierModels.createAnAtelier(data)
        res.status(200).json(atelier)
    } catch (error) {
        res.status(500).json("Failed to create an atelier");

    }
})
// /api/atelier/:id
router.delete('/api/atelier/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const atelier = await atelierModels.deleteAnAtelier(id)
        res.status(200).json(atelier)
    } catch (error) {
        res.status(500).json("Failed to delete an atelier");

    }
})
// /api/atelier/:id
router.put('/api/atelier/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const data = {
            atelier_name : req.body.atelier_name
        }
        const atelier = await atelierModels.updateAnAtelier(data, id)
        res.status(200).json(atelier)
    } catch (error) {
        res.status(500).json("Failed to update an atelier");
    }
})


module.exports = router