const pool = require('../Config/connection');


// create
async function createEquipmentTrack(data) {
    try {
        const { equipment_id, employee_id, atelier_id, quantity_issued } = data;
        const [equipment] = await pool.query('SELECT quantity_available FROM equipment WHERE equipment_id = ?', [equipment_id])
        const qts = equipment[0].quantity_available;
        if (qts < quantity_issued) {
            throw new Error('Check quantity');
        }
        // Insert into trackequipment table
        const [track] = await pool.query('INSERT INTO trackequipment(equipment_id, employee_id, atelier_id, quantity_issued) VALUES(?,?,?,?)',
            [equipment_id, employee_id, atelier_id, quantity_issued]);

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
        const [track] = await pool.query('SELECT t.id,t.date_issued,t.quantity_issued,e.employee_name,e.last_name,eq.code,eq.equipment_name,atelier.atelier_name FROM trackequipment as t JOIN employees as e on t.employee_id = e.employee_id join equipment as eq on eq.equipment_id = t.equipment_id join atelier on atelier.atelier_id = t.atelier_id');
        return track;
    } catch (error) {
        console.error('Failed To get all Tracks');
    }
}

async function searchTracks(data) {
    try {
        const { equipment_id, employee_id, atelier_id, date_issued } = data;
        let sql = 'SELECT * FROM trackequipment WHERE equipment_id = ?';
        const values = [equipment_id]; // Start with equipment_id as the only value

        if (employee_id) {
            sql += ' AND employee_id = ?';
            values.push(employee_id);
        }
        if (atelier_id) {
            sql += ' AND atelier_id = ?';
            values.push(atelier_id);
        }
        if (date_issued) {
            sql += ' AND date_issued BETWEEN ? AND ?';
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