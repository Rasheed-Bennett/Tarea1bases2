
var express = require('express'); // Web Framework
var app = express();
app.use(express.json());
var sql = require('mssql'); // MS Sql Server client
require('dotenv').config();

// Connection string parameters.
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});


app.get('/Product/id/:productID', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request().input('ProductID', sql.Int, req.params.productID).execute('Production.GetProductByID')
        res.json(resultado.recordset);
    }
    catch (error) {
        res.status(500).json({ error: 'No se logro obtener el producto por ID' });

    }
})

app.get('/Product/CategoryId/:ProductID', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request().input('ProductID', sql.Int, req.params.ProductID).execute('Production.JGetProductCategoryByID')
        res.json(resultado.recordset);
    }
    catch (error) {
        res.status(500).json({ error: 'No se logro obtener la categoria por ID' });

    }
})

app.get('/Product/name/:productName', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request().input('ProductName', sql.VarChar, req.params.productName).execute('Production.GetProductByName')
        res.json(resultado.recordset);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se logro obtener el producto por Nombre' });

    }
})

app.get('/Product/CategoryName/:productName', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request().input('ProductName', sql.VarChar, req.params.productName).execute('Production.JGetProductCategoryByName')
        res.json(resultado.recordset);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se logro obtener el producto por Nombre' });

    }
})

app.delete('/Product/id/:productID', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request().input('ProductID', sql.Int, req.params.productID).execute('Production.GetProductByID')
        res.json({ message: 'Producto borrado exitosamente', ProductID: resultado.recordset[0].ProductID });
    }
    catch (error) {
        res.status(500).json({ error: 'No se logro borrar el producto por ID' });

    }
})

app.delete('/Product/id/:productID', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request()
            .input('ProductID', sql.Int, req.params.productID)
            .input('ReviewID', sql.Int, req.body.ReviewID)
            .execute('Production.JDeleteProductReviewByID')
        res.json({ message: 'Producto borrado exitosamente', ProductID: resultado.recordset[0].ProductID });
    }
    catch (error) {
        res.status(500).json({ error: 'No se logro borrar el producto por ID' });

    }
})


app.put('/Product/id/:productID', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request()
            .input('ProductName', sql.VarChar, req.params.productName)
            .input('ProductNumber', sql.VarChar, req.body.ProductNumber)
            .input('Color', sql.VarChar, req.body.Color)
            .input('StandardCost', sql.Decimal(19, 4), req.body.StandardCost)
            .input('ListPrice', sql.Decimal(19, 4), req.body.ListPrice)
            .input('Size', sql.VarChar, req.body.Size)
            .input('Weight', sql.Decimal(8, 2), req.body.Weight)
            .input('ProductCategoryID', sql.Int, req.body.ProductCategoryID)
            .input('ProductModelID', sql.Int, req.body.ProductModelID)
            .execute('Production.UpdateProductByID')
        res.json({ message: 'Producto actualizado exitosamente', ProductID: resultado.recordset[0].ProductID });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se logro actualizar el producto' });

    }
})

app.put('/Product/CategoryId/:productID', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request()
            .input('ProductID', sql.Int, req.params.productID)
            .input('CategoryID', sql.Int, req.body.CategoryID)
            .execute('Production.JUpdateProductCategoryByID')
        res.json({ message: 'Producto actualizado exitosamente', ProductID: resultado.recordset[0].ProductID });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se logro actualizar el producto' });

    }
})

app.post('/Product', async function (req, res) {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request()
            .input('ProductName', sql.VarChar, req.params.productName)
            .input('ProductNumber', sql.VarChar, req.body.ProductNumber)
            .input('Color', sql.VarChar, req.body.Color)
            .input('StandardCost', sql.Decimal(19, 4), req.body.StandardCost)
            .input('ListPrice', sql.Decimal(19, 4), req.body.ListPrice)
            .input('Size', sql.VarChar, req.body.Size)
            .input('Weight', sql.Decimal(8, 2), req.body.Weight)
            .input('ProductCategoryID', sql.Int, req.body.ProductCategoryID)
            .input('ProductModelID', sql.Int, req.body.ProductModelID)
            .execute('Production.InsertProduct')
        res.json({ message: 'Producto creado exitosamente', ProductID: resultado.recordset[0].ProductID });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se logro crear el producto' });

    }
})

sql.close();