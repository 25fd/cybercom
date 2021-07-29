const pool = require('../mysql');

exports.getNote = async (req, res) => {
    try{
        await createCategotyTable()
        const sql = "SELECT *FROM category ";  
        const data  = await pool.query(sql)
        res.sendResponse(data)
    }  catch(e) {
        res.sendError('error in get data of table');
    }
    
}

exports.createNote = async(req, res) => {
    try {
        await createCategotyTable()
        const sql = "INSERT INTO category (CategoryId, Name) VALUES ?";  
        const values =  req.body.data
        const data  = await pool.query(sql, [values])
        return res.sendResponse(data)
    } catch(e) {
        return res.sendError('error in insertion of table');
    }
}

exports.updateNote = async(req, res) => {
    try {
        const name = req.body.name;
        const id =  parseInt(req.params.id);
        const sql = `UPDATE category 
                    SET Name = ? 
                    Where CategoryId = ?`;  
        const data  = await pool.query(sql, [name, id])
        return res.sendResponse(data)
    } catch(e) {
        console.log(e);
        return res.sendError('error in updation of table');
    }
}

exports.deleteCategory = async(req, res) => {
    try {
        const id =  parseInt(req.params.id);
        const sql = `DELETE FROM category 
                    WHERE CategoryId = ${id}`;  
        const data  = await pool.query(sql)
        return res.sendResponse(data)
    } catch(e) {
        console.log(e);
        return res.sendError('error in updation of table');
    }
}

async function createCategotyTable() {
    const sql = `CREATE TABLE category (
        CategoryId INT NOT NULL PRIMARY KEY, 
        Name VARCHAR(255) NOT NULL)`
    try {
        await pool.query(sql);
        console.log(`category table created successfully`);
    } catch(e) {
        if (e.code !== 'ER_TABLE_EXISTS_ERROR') throw e;
    }
}