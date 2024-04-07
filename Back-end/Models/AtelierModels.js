const pool = require('../Config/connection')


// get all Atelier

async function getAllAtelier() {
    try {
        const [rows] = await pool.query('SELECT * FROM atelier')
        return rows
    } catch (error) {
        console.log('Failed to get all atelier');
    }
}

// get atelier by id
async function getAtelierByID(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM atelier WHERE atelier_id =  ?', [id])
        return rows
    } catch (error) {
        console.log('Failed to get an atelier');

    }
}
// add atelier
async function createAnAtelier(data) {
    try {
        const { atelier_name } = data
        const [rows] = await pool.query('INSERT INTO atelier(atelier_name) VALUES(?)', [atelier_name])
        return rows.insertId
    } catch (error) {
        console.log('Failed to create an atelier');

    }
}
// delete
async function deleteAnAtelier(id) {
    try {
        const [rows] = await pool.query('DELETE FROM atelier WHERE atelier_id = ?', [id])
        return rows
    } catch (error) {
        console.log('Failed to delete an atelier');

    }
}
// update 
async function updateAnAtelier(data, id) {
    try {
        const { atelier_name } = data
        const [rows] = pool.query('UPDATE atelier SET atelier_name = ? WHERE atelier_id = ?', [atelier_name, id])
        return rows
    } catch (error) {
        console.log('Failed to update an atelier');
    }
}
module.exports = {
    getAllAtelier,
    getAtelierByID,
    createAnAtelier,
    deleteAnAtelier,
    updateAnAtelier
}