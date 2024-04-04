const express = require('express');
const router = express.Router();
const employeeModels = require('../Models/EmployeesModels');

router.post('/api/createEmployee', async (req, res) => {
    try {
        const data = {
            employee_name: req.body.employee_name,
            last_name: req.body.last_name
        }
        const employees = await employeeModels.createEmployee(data)
        res.status(201).json(employees);
    } catch (error) {
        console.error('Failed to create an Employee');
        res.status(500).json({ error: 'Failed to create an employee' });
    }
})


module.exports = router;