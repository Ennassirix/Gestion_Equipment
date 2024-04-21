const pool = require('../Config/connection');


async function createEquipmentTrack(data) {
    try {
        const { code, ref, equipment_name, employee_name, atelier_name, position_name, quantity } = data;

        // Obtain current date
        const date_issued = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Check if quantity available is sufficient
        const [equipment] = await pool.query('SELECT quantity_available FROM equipment WHERE code = ?', [code]);
        const qts = equipment[0].quantity_available;
        if (qts < quantity) {
            throw new Error('Insufficient quantity available');
        }

        // Insert into trackequipment table
        const [track] = await pool.query('INSERT INTO trackequipment(code, ref, equipment_name, employee_name, atelier_name, position_name, quantity, created_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
            [code, ref, equipment_name, employee_name, atelier_name, position_name, quantity, date_issued]);

        // Update quantity_available in equipment table
        await pool.query('UPDATE equipment SET quantity_available = quantity_available - ? WHERE code = ?',
            [quantity, code]);

        return track.insertId;
    } catch (error) {
        console.error('Failed to create a Track:', error);
        throw error; // Propagate the error up
    }
}

// get All

async function getAllTracks() {
    try {
        const [track] = await pool.query(`SELECT *,DATE_FORMAT(created_date, '%Y-%m-%d') as created_date FROM trackequipment`);
        return track;
    } catch (error) {
        console.error('Failed To get all Tracks');
    }
}

// async function searchTracks(data) {
//     try {
//         const { code, employee_name, atelier_name, created_date } = data;
//         let sql = `SELECT *,DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date FROM trackequipment WHERE 1 = 1`;
//         const values = [];

//         if (code) {
//             sql += ' AND code = ?'; // Specify table alias for equipment_id
//             values.push(code);
//         }
//         if (employee_name) {
//             sql += ' AND employee_name = ?'; // Specify table alias for employee_id
//             values.push(employee_name);
//         }
//         if (atelier_name) {
//             sql += ' AND atelier_name = ?'; // Specify table alias for atelier_id
//             values.push(atelier_name);
//         }
//         if (created_date && created_date.length === 2) { // Check if date_issued is an array with 2 elements
//             sql += ' AND t.date_issued BETWEEN ? AND ?'; // Specify table alias for date_issued
//             // Assuming date_issued is an array containing [startDate, endDate]
//             values.push(created_date[0]); // Start date
//             values.push(created_date[1]); // End date
//         }

//         const [results] = await pool.query(sql, values);
//         return results;
//     } catch (error) {
//         console.error('Failed to filter all Tracks', error);
//         throw error; // Throw the error to handle it outside this function
//     }
// }

async function searchTracks(data) {
    try {
        const { code, employee_name, atelier_name, created_date } = data;
        let sql = `SELECT *, DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date FROM trackequipment WHERE 1 = 1 `;
        const values = [];

        if (code) {
            sql += ' AND code = ?';
            values.push(code);
        }
        if (employee_name) {
            sql += ' AND employee_name = ?';
            values.push(employee_name);
        }
        if (atelier_name) {
            sql += ' AND atelier_name = ?';
            values.push(atelier_name);
        }
        if (created_date && created_date.length === 2) {
            sql += ' AND created_date BETWEEN ? AND ?'; // Assuming created_date is the column name
            values.push(created_date[0]); // Start date
            values.push(created_date[1]); // End date
        }

        const [results] = await pool.query(sql, values);
        return results;
    } catch (error) {
        console.error('Failed to filter all Tracks', error);
        throw error;
    }
}




module.exports = {
    createEquipmentTrack,
    getAllTracks,
    searchTracks
}