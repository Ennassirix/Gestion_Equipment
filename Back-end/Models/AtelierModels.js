const pool = require('../Config/connection')


// get all Atelier

async function getAllAtelier(){
    try {
        const [rows] = await pool.query('SELECT * FROM atelier')
        return rows;
    } catch (error) {
        console.log('Failed to get all atelier');
    }
}

module.exports = {
    getAllAtelier
}