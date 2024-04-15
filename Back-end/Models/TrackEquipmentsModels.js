const pool = require('../Config/connection');


// create
async function createEquipmentTrack(data) {
    try {
        const { equipment_id, employee_id, atelier_id, quantity_issued } = data;

        // Obtain current date
        const date_issued = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Check if quantity available is sufficient
        const [equipment] = await pool.query('SELECT quantity_available FROM equipment WHERE equipment_id = ?', [equipment_id]);
        const qts = equipment[0].quantity_available;
        if (qts < quantity_issued) {
            throw new Error('Insufficient quantity available');
        }

        // Insert into trackequipment table
        const [track] = await pool.query('INSERT INTO trackequipment(equipment_id, employee_id, atelier_id, date_issued, quantity_issued) VALUES(?, ?, ?, ?, ?)',
            [equipment_id, employee_id, atelier_id, date_issued, quantity_issued]);

        // Update quantity_available in equipment table
        await pool.query('UPDATE equipment SET quantity_available = quantity_available - ? WHERE equipment_id = ?',
            [quantity_issued, equipment_id]);

        return track.insertId;
    } catch (error) {
        console.error('Failed to create a Track:', error);
        throw error; // Propagate the error up
    }
}

// get All

async function getAllTracks() {
    try {
        const [track] = await pool.query(`SELECT 
    t.id,
    DATE_FORMAT(t.date_issued, '%Y-%m-%d') AS formatted_date_issued,
    t.quantity_issued,
    e.employee_name,
    e.last_name,
    eq.code,
    eq.equipment_name,
    atelier.atelier_name 
FROM 
    trackequipment AS t 
JOIN 
    employees AS e ON t.employee_id = e.employee_id 
JOIN 
    equipment AS eq ON eq.equipment_id = t.equipment_id 
JOIN 
    atelier ON atelier.atelier_id = t.atelier_id
`);
        return track;
    } catch (error) {
        console.error('Failed To get all Tracks');
    }
}

async function searchTracks(data) {
    try {
        const { equipment_id, employee_id, atelier_id, date_issued } = data;
        let sql = `SELECT 
            t.id,
            DATE_FORMAT(t.date_issued, '%Y-%m-%d') AS formatted_date_issued,
            t.quantity_issued,
            e.employee_name,
            e.last_name,
            eq.code,
            eq.equipment_name,
            atelier.atelier_name 
        FROM 
            trackequipment AS t 
        JOIN 
            employees AS e ON t.employee_id = e.employee_id 
        JOIN 
            equipment AS eq ON eq.equipment_id = t.equipment_id 
        JOIN 
            atelier ON atelier.atelier_id = t.atelier_id 
        WHERE 1 = 1`;

        const values = [];

        if (equipment_id) {
            sql += ' AND t.equipment_id = ?'; // Specify table alias for equipment_id
            values.push(equipment_id);
        }
        if (employee_id) {
            sql += ' AND t.employee_id = ?'; // Specify table alias for employee_id
            values.push(employee_id);
        }
        if (atelier_id) {
            sql += ' AND t.atelier_id = ?'; // Specify table alias for atelier_id
            values.push(atelier_id);
        }
        if (date_issued && date_issued.length === 2) { // Check if date_issued is an array with 2 elements
            sql += ' AND t.date_issued BETWEEN ? AND ?'; // Specify table alias for date_issued
            // Assuming date_issued is an array containing [startDate, endDate]
            values.push(date_issued[0]); // Start date
            values.push(date_issued[1]); // End date
        }

        const [results] = await pool.query(sql, values);
        return results;
    } catch (error) {
        console.error('Failed to filter all Tracks', error);
        throw error; // Throw the error to handle it outside this function
    }
}




module.exports = {
    createEquipmentTrack,
    getAllTracks,
    searchTracks
}