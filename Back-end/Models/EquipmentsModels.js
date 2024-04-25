const pool = require('../Config/connection')

// create an equipment 
async function createAnEquipment(data) {
    try {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' '); // Convert to MySQL-compatible date format
        const { code, ref, equipment_name, quantity_available, position_name } = data;
        const [rows] = await pool.query(
            'INSERT INTO equipment(code, ref, equipment_name, quantity_available, position_name, created_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [code, ref, equipment_name, quantity_available, position_name, date, date]
        );
        return rows.insertId;
    } catch (error) {
        console.error('Failed to add an equipment:', error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}

// update
async function updateAnEquipment(data, id) {
    try {
        const { code, ref, equipment_name, quantity_available, position_name } = data
        const [rows] = await pool.query('UPDATE equipment SET code = ?, ref = ?,equipment_name = ?, quantity_available= ?, position_name = ? WHERE equipment_id = ?',
            [code, ref, equipment_name, quantity_available, position_name, id])
        return rows.affectedRows
    } catch (error) {
        console.log('Failed to update an equipment')
    }
}

// update qts

async function updateQuantity(data, id) {
    try {
        const { quantity_available } = data
        const [rows] = await pool.query('UPDATE equipment SET quantity_available = quantity_available + ? WHERE equipment_id = ? ',
            [quantity_available, id])
        return rows.affectedRows
    } catch (error) {
        console.log('Failed to update qts m')

    }
}

// delete 
async function deleteAnEquipment(id) {
    try {
        const [rows] = await pool.query('DELETE FROM equipment WHERE equipment_id = ?', [id])
        return rows
    } catch (error) {
        console.log('Failed to delete an equipment')

    }
}
// get all 
async function getAllEquipment() {
    try {
        const [rows] = await pool.query(`
            SELECT *, DATE_FORMAT(updated_date, '%Y-%m-%d') AS formatted_date
            FROM equipment ORDER BY quantity_available ASC LIMIT 10
        `);

        // Convert the updated_date string to Date objects and format them
        const formattedRows = rows.map(row => {
            return {
                ...row,
                updated_date: new Date(row.updated_date).toLocaleDateString('en-GB') // Change 'en-GB' to the appropriate locale if needed
            };
        });

        return formattedRows;
    } catch (error) {
        console.error('Failed to get all equipment:', error);
        throw error;
    }
}




// get by id
async function getAnEquipmentByID(id) {
    try {
        const [rows] = await pool.query('SELECT equipment_id,code,ref,equipment_name,quantity_available,position_name FROM equipment WHERE equipment_id = ? ', [id])
        return rows;
    } catch (error) {
        console.log('Failed to get an equipment by id');
    }
}



// Example function to monitor equipment quantity
async function monitorEquipmentQuantity() {
    const notifications = [];
    try {
        const equipments = await getAllEquipment(); // Function to fetch all equipments from the database

        equipments.forEach(async equipment => {
            if (equipment.quantity_available <= 5) {
                // Send notification
                notifications.push({ id: equipment.equipment_id, equipment_name: equipment.equipment_name, quantity_available: equipment.quantity_available, updated_date: equipment.updated_date });
            }
        });
    } catch (error) {
        console.error('Error monitoring equipment quantity:', error);
    }
    return notifications;
}



// get by code

async function getByCode(code) {
    try {
        const [rows] = await pool.query('SELECT * FROM equipment WHERE code = ?', [code])
        return rows
    } catch (error) {
        console.error('Error monitoring equipment quantity:', error);
    }
}





module.exports = {
    createAnEquipment,
    updateAnEquipment,
    deleteAnEquipment,
    getAllEquipment,
    getAnEquipmentByID,
    monitorEquipmentQuantity,
    updateQuantity,
    getByCode
}