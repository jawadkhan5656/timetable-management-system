const section = require('express').Router();
const verifyToken = require('./verifyToken');
const connection = require('../connection');
const sectionScehma = require('./validation_schemas/section_schema');

section.post("/addsection", verifyToken, (req, res) => {
    const {section_id, section_name} = req.body;
    
    const {error} = sectionScehma(req.body);
    if(error) 
        res.send(error.details[0].message)

    const sql = `SELECT * FROM section WHERE section_name = '${section_name}'`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            if(results.length > 0) 
                res.send("section already registered")
            else {
                const sql = `INSERT INTO section (section_id, section_name) VALUES ('${section_id}', '${section_name}')`
                connection.query(sql, (err, results, fields) => {
                    if(err)
                        res.send(err)
                    res.send("Section added successfully")
                })
            }
        }
    })
})

section.get("/allsections", verifyToken, (req, res) => {
    const sql = `SELECT * FROM section`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send(results)
    })
})

section.put("/updatesection", verifyToken, (req, res) => {
    const {section_id, section_name} = req.body;
    const {error} = sectionScehma(req.body);
    if(error) 
        res.send(error.details[0].message)

    else {
        const sql = `UPDATE section SET section_name = '${section_name}' WHERE section_id = '${section_id}'`
        connection.query(sql, (err, results, fields) => {
            if(err)
                res.send(err)
            res.send("Section updated successfully")
        })
    }
})

section.delete("/deletesection", verifyToken, (req, res) => {
    const {section_id} = req.query;
    const sql = `DELETE FROM section WHERE section_id = '${section_id}'`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send("Section deleted successfully")
    })
})

module.exports = section;