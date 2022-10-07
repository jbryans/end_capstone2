const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
       next();
 });

 require("dotenv").config();

const {USERNAME, PASSWORD, HOST, DATABASE} = process.env;

const db = mysql.createConnection({
    connectionLimit: 100,
    user : USERNAME,
     password : PASSWORD,
    host : HOST,
    database : DATABASE
})


app.post('/create', (req, res) => {
    const full_name = req.body.full_name
    const home_address = req.body.home_address
    const grass = req.body.grass
    const sqft = req.body.sqft

    db.query(
        'INSERT INTO customers (full_name, home_address, grass, sqft) VALUES (?, ?, ?, ?)',
         [full_name, home_address, grass, sqft],(err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
         } );
});

app.get('/customers', (req, res) => {
    db.query("SELECT * FROM customers", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id
    const full_name = req.body.full_name
    db.query("UPDATE customers SET full_name = ? WHERE id = ?", [full_name, id], (err, result) =>{
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM customers WHERE id = ?", id, (err, result) =>{
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, ()=>{
    console.log("server is running")
})


