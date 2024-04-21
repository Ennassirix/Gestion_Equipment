const pool = require('../Config/connection');

// Create an employee
async function createEmployee(data) {
    try {
        const { employee_name } = data;
        const [result] = await pool.query('INSERT INTO employees(employee_name) VALUES(?)',
            [employee_name]);
        return result.insertId;
    } catch (error) {
        console.error('Failed to create an Employee: ', error);
        throw error; // Rethrow the error for handling elsewhere
    }
}

// get all employees :

async function getAllEmployees() {
    try {
        const [rows] = await pool.query('SELECT * FROM employees');
        return rows;
    } catch (error) {
        console.error('Failed to get all employees:', error);
        throw error; // Rethrow the error for handling by the calling code
    }
}
// get employee By id:
async function getAllEmployeeByID(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM employees WHERE employee_id = ? ', [id]);
        return rows;
    } catch (error) {
        console.error('Failed to get an employees by id:', error);
        throw error; // Rethrow the error for handling by the calling code
    }
}
// delete Employee :
async function deleteAnEmployee(id) {
    try {
        const result = await pool.query("DELETE FROM employees WHERE employee_id = ?", [id]);
        return result.affectedRows; // Return the number of affected rows
    } catch (error) {
        console.error('Failed to delete an employee by id:', error);
        throw error; // Rethrow the error for handling by the calling code
    }
}

// update Employee :

async function updateAnEmployee(data, id) {
    try {
        const { employee_name } = data
        const [rows] = await pool.query('UPDATE employees SET employee_name = ? WHERE employee_id = ?',
            [employee_name, id])
        return rows;
    } catch (error) {
        console.error('Failed to update an employees by id:', error);

    }
}


module.exports = {
    createEmployee,
    getAllEmployees,
    getAllEmployeeByID,
    deleteAnEmployee,
    updateAnEmployee
};
