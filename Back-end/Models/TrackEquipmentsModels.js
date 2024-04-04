const pool = require('../Config/connection');


// create
async function createEquipmentTrack(data) {
    try {
        const { equipment_id, employee_id, atelier_id, date_issued, quantity_issued } = data;
        const [track] = await pool.query('INSERT INTO trackequipment(equipment_id, employee_id, atelier_id, date_issued, quantity_issued) VALUES(?,?,?,?,?)',
            [equipment_id, employee_id, atelier_id, date_issued, quantity_issued]);
        return track.insertId;
    } catch (error) {
        console.error('Failed To created a Track');
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


module.exports = {
    createEquipmentTrack,
    getAllTracks
}