const adminRoutes = require("express").Router();
// const mysql = require("mysql");
const bcrypt = require("bcryptjs");
// const joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv/config")
const verifyToken = require("./routes/verifyToken");
const connection = require('./connection');
const admin_schema = require("./routes/validation_schemas/admin_schema");


adminRoutes.post("/registerAdmin", async (req, res) => {
    const {admin_id, admin_name, email, password} = req.body;
    const {error} = admin_schema(req.body);
    if(error) {
        res.send(error.details[0].message)
    }
    
    else {

        const select = `SELECT * FROM admin_login WHERE email = '${email}'`

        connection.query(select, async (err, results, fields) => {
            if(err)
                res.send(err)
            else {
                if(results.length > 0) {
                    res.send("email already registered")
                }
                else {
                    const salt = await bcrypt.genSalt(10);

                    const hash = await bcrypt.hash(password, salt);

                    const sql = `INSERT INTO admin_login(admin_id, admin_name, email, password ) VALUES ('${admin_id}', '${admin_name}', '${email}', '${hash}')`

                    connection.query(sql, (err, results, fields) => {
                        if(err) {
                            res.send(err);
                        }
                        else {
                            res.send(results)
                        }
                    })
                }
            }
        })
    }
})



adminRoutes.post("/loginAdmin", (req, res) => {
    const {email, password} = req.body;

    const sql = `SELECT * FROM admin_login WHERE email = '${email}'`

    connection.query(sql, async (err, results, fields) => {
        if(err) {
            res.send(err)
        }
        else {
            const hash = results[0].password
             //res.send(hash)
             const compare = await bcrypt.compare(password, hash)
            if(compare) {
                // res.send("Login successful")
                const token = jwt.sign({email},  process.env.SECRET)
                
                // res.header('token', token).send();
                res.header('token', token).send()
            }
            else {
                res.status(401).send("the length for password must be varchar(60).....Invalid username or password...")
            }
        }
    })
})




module.exports = adminRoutes;