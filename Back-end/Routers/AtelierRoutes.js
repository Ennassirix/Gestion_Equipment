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


module.exports = router