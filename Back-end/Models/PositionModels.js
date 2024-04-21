const pool = require('../Config/connection');


// gel all
async function getAllPosition() {
    try {
        const [rows] = await pool.query('SELECT * FROM position')
        return rows
    } catch (error) {
        console.log('Failed to get all position');
    }
}
// get by id
async function getPositionByID(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM position WHERE position_id = ?', [id])
        return rows
    } catch (error) {
        console.log('Failed to get position by id');
    }
}
// create
async function createPosition(data) {
    try {
        const { position_name } = data;
        const [rows] = await pool.query('INSERT INTO `position` (position_name) VALUES (?)', [position_name]);
        return rows.insertId;
    } catch (error) {
        console.error('Failed to create position:', error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}

// delete
async function deletePosition(id) {
    try {
        const [rows] = await pool.query('DELETE FROM `position` WHERE position_id = ? ', [id])
        return rows
    } catch (error) {
        console.log('Failed to delete position by id',error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}
// update 
async function updatePosition(data, id) {
    try {
        const { position_name } = data
        const [rows] = await pool.query('UPDATE position SET position_name = ? WHERE position_id = ?', [position_name, id])
        return rows.insertId
    } catch (error) {
        console.log('Failed to update position by id');
    }
}


async function getPositionByName(positionName) {
    try {
        const [rows] = await pool.query('SELECT * FROM position WHERE position_name = ?', [positionName]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Failed to get position by name:', error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}


module.exports = {
    getAllPosition,
    getPositionByID,
    updatePosition,
    createPosition,
    deletePosition,
    getPositionByName
}