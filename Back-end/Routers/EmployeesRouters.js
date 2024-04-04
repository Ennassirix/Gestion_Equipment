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


router.get('/api/allEmployees', async (req, res) => {
    try {
        const employees = await employeeModels.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Failed to get all employees:', error);
        res.status(500).json({ error: 'Failed to retrieve employees' });
    }
});


module.exports = router;