
var express = require('express'); // Web Framework
var app = express();
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


app.get('/Product/id/:productID', function (req, res) {
    sql.connect(sqlConfig, function () {
        var request = new sql.Request();
        var stringRequest = 'select * from Sales.Customer where customerId = ' + req.params.customerId;
        request.query(stringRequest, function (err, recordset) {
            if (err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
})

app.get('/Product/name/:productName', function (req, res) {
    sql.connect(sqlConfig, function () {
        var request = new sql.Request();
        var stringRequest = 'select * from Sales.Customer where customerId = ' + req.params.customerId;
        request.query(stringRequest, function (err, recordset) {
            if (err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
})


app.get('/customers/:customerId/orders', function (req, res) {
    sql.connect(sqlConfig, function () {
        var request = new sql.Request();
        request.input('CustomerId', req.params.customerId);
        request.execute('Sales.uspShowOrderDetails', function (err, recordsets, returnValue, affected) {
            if (err) console.log(err);
            res.end(JSON.stringify(recordsets)); // Result in JSON format
        });
    });
})

sql.close();