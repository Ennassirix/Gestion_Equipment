const pool = require('../Config/connection');

// Create an employee
async function createEmployee(data) {
    try {
        const { employee_name, last_name } = data;
        const [result] = await pool.query('INSERT INTO employees(employee_name, last_name) VALUES(?,?)', [employee_name, last_name]);
        return result.insertId;
    } catch (error) {
        console.error('Failed to create an Employee: ', error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

// get all employees :
// get employee By id:
// delete Employee : 
// update Employee : 



module.exports = {
    createEmployee
};
