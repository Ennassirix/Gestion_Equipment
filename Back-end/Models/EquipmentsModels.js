const pool  = require('../Config/connection')

// create an equipment 
async function createAnEquipment(data){
    try {
        const {} = data
        const [rows] = await pool.query('INSERT INTO equipment() VALUES()',[])
        return rows.insertId;
        
    } catch (error) {
        console.log('Failed to add ana equipments');
    }
}
// update
async function updateAnEquipment(data,id){
    try {
        const {}  = data
        const [rows] = await pool.query('UPDATE equipment SET WHERE id = ?',[id])
        return rows.insertId
    } catch (error) {
        console.log('Failed to update an equipment')
    }
}
// delete 
async function deleteAnEquipment(id){
    try {
        const [rows] = await pool.query('DELETE FROM equipment WHERE id = ?',[id])
        return rows
    } catch (error) {
        console.log('Failed to delete an equipment')
        
    }
}
// get all 
async function getAllEquipment(){
    try {
        const [rows] = await pool.query('SELECT * from equipment');
        return rows;
    } catch (error) {
        console.log('Failed to get all equipment model')
         
    }
}
// get by id
async function getAnEquipmentByID(id){
    try {
        const [rows] = await pool.query('SELECT * FROM equipment WHERE id = ?',[id])
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