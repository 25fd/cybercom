const pool = require('../mysql');
const path = require('path')

exports.getProduct = async (req, res) => {
    try{
        await createProductTable()
        const sql = "SELECT *, category.Name as CategoryName  FROM product INNER JOIN category ON product.CategoryId = category.CategoryId ";  
        const data  = await pool.query(sql)
        res.sendResponse(data)
    }  catch(e) {
        res.sendError('error in get data of table');
    }
    
}

exports.createProduct = async(req, res) => {
    try {
        await createProductTable()
        const sqlGet = "SELECT MAX(SKU) AS MaxSKU FROM product";
        const lastSku = JSON.parse(JSON.stringify(await pool.query(sqlGet)))[0];
        console.log(lastSku);
        let maxNumber = lastSku['MaxSKU'] === null ? 0 : parseInt(lastSku['MaxSKU'].slice(-5));
        const sqlInsert = "INSERT INTO product (ProductId, CategoryId, Name, Price, SKU) VALUES ?";  
        const products =  req.body.Products;
        const productSqlArray= [];
        for (let i = 0; i < products.length; i++) {
            maxNumber += 1;
            const nextSKU = ('00000' + maxNumber).slice(-5)
           productSqlArray.push([products[i].ProductId, products[i].CategoryId, products[i].Name, products[i].Price,'PROD' + nextSKU]);
        }
        // console.log(sql);
        console.log(productSqlArray)
        const data  = await pool.query(sqlInsert, [productSqlArray])
        return res.sendResponse(data)
    } catch(e) {
        console.log(e);
        return res.sendError('error in insertion of table');
    }
}

exports.updateProduct = async(req, res) => {
    try {
        const {name, price} = req.body;
        const image = req.files.image
        console.log( {name, price});
        const id =  parseInt(req.params.id);
        const imagePath = await uploadImage(image);

        const sql = `UPDATE product 
                    SET Name = ? , Price= ?, Image= ?
                    Where ProductId = ?`;  
        const data  = await pool.query(sql, [name, price, imagePath,id])
        return res.sendResponse(data)
    } catch(e) {
        console.log(e);
        return res.sendError('error in updation of table');
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const id =  parseInt(req.params.id);
        const sql = `DELETE FROM product 
                    WHERE ProductId = ${id}`;  
        const data  = await pool.query(sql)
        return res.sendResponse(data)
    } catch(e) {
        console.log(e);
        return res.sendError('error in updation of table');
    }
}
async function createProductTable() {
    const sql = `CREATE TABLE IF NOT EXISTS product (
        ProductId INT NOT NULL PRIMARY KEY, 
        Name VARCHAR(255) NOT NULL,
        Price INT NOT NULL,
        CategoryId INT,
        SKU  VARCHAR(255),
        Image VARCHAR(255),
        FOREIGN KEY  (CategoryId)
        REFERENCES category(CategoryId) ON UPDATE CASCADE ON DELETE CASCADE
        )`
        console.log(sql);
    try {
        await pool.query(sql);
        console.log(`product table created successfully`);
    } catch(e) {
        console.log(e);
        if (e.code !== 'ER_TABLE_EXISTS_ERROR') throw e;
    }
}

async function uploadImage(image) {
    try {
        const uploadPath = path.join(__dirname , '../public/' + image.name);
            await image.mv(uploadPath);
            return uploadPath;
    } catch(e) {
        console.log(e);
         throw e;
    }
}