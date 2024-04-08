const pool = require('../Config/connection')

// create an equipment 
async function createAnEquipment(data) {
    try {
        const { code, equipment_name, quantity_available } = data
        const [rows] = await pool.query('INSERT INTO equipment(code, equipment_name, quantity_available) VALUES(?,?,?)', [code, equipment_name, quantity_available])
        return rows.insertId;

    } catch (error) {
        console.log('Failed to add ana equipments');
    }
}
// update
async function updateAnEquipment(data, id) {
    try {
        const { code, equipment_name, quantity_available } = data
        const [rows] = await pool.query('UPDATE equipment SET code = ?, equipment_name = ?, quantity_available= ? WHERE equipment_id = ?', [code, equipment_name, quantity_available, id])
        return rows.affectedRows
    } catch (error) {
        console.log('Failed to update an equipment')
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
        const [rows] = await pool.query('SELECT * from equipment ORDER BY equipment.equipment_name ASC ');
        return rows
            
    } catch (error) {
        console.log('Failed to get all equipment model')

    }
}
// get by id
async function getAnEquipmentByID(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM equipment WHERE equipment_id = ? LIMIT 1 ', [id])
        return rows;
    } catch (error) {
        console.log('Failed to get an equipment by id');
    }
}


module.exports = {
    createAnEquipment,
    updateAnEquipment,
    deleteAnEquipment,
    getAllEquipment,
    getAnEquipmentByID
}