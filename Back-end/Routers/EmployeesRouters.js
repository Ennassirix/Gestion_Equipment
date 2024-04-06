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
        res.status(200).json(employees);
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

router.get('/api/employee/:id', async (req, res) => {
    try {
        const id = req.params.id; // Access id from req.params
        const employee = await employeeModels.getAllEmployeeByID(id);
        res.status(200).json(employee); // 200 for success
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to get employee by id' });
    }
});

// delete
router.delete('/api/employee/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const employee = await employeeModels.deleteAnEmployee(id);
        res.status(500).json(employee)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete an employee' })
    }
})

// update 
router.put('/api/employee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            employee_name : req.body.employee_name,
            last_name: req.body.last_name
        }
        const employee = await employeeModels.updateAnEmployee(data,id);
        res.status(500).json(employee)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update an employee' })
    }
})

module.exports = router;