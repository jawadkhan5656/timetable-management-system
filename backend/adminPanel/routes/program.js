const program = require('express').Router();
const programSchema = require('./validation_schemas/program_schema');
const verifyToken = require('./verifyToken');
const connection = require('../connection');

program.get("/getids", verifyToken, (req, res) => {
    const sql = `SELECT department_name FROM department`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
       else {
         res.send(results)
       }
    })
})
program.post("/addprogram", verifyToken, (req, res) => {
    const {program_id, program_name, credits_required, department_name} = req.body;

    const {error} = programSchema(req.body);
    if(error) {
        res.send(error.details[0].message);
        return;
    }
    const sql = `SELECT
        p.program_id,
        d.department_id
    FROM
        program p
    JOIN
        department d ON p.department_id = d.department_id`;
    connection.query(sql, (err, results, fields) => {
        if(err) {
            res.send(err)
        }
        else {
            if(results.length > 0) {
                res.send("program_id already registered...try another one")
            }
            else {
                const sql = `INSERT INTO program(program_id, program_name, credits_required, department_id) VALUES ('${program_id}', '${program_name}', '${credits_required}', (SELECT department_id FROM department WHERE department_name = '${department_name}'))`;
                connection.query(sql, (err, results, fields) => {
                    if(err)
                        res.send(err)
                    res.send("Program added succesfully")
                })
            }
        }
      
    })
    
})

program.get("/allprograms", verifyToken, (req, res) => {
    const sql = `SELECT 
        p.program_id,
        p.program_name,
        p.credits_required,
        d.department_name
    FROM
        program p
    JOIN
        department d ON p.department_id = d.department_id`;
    connection.query(sql, (err, results, fields) => {
        if(err) 
            res.send(err)
        else {
            res.send(results)
        }
    })
})

program.put("/updateprogram", verifyToken, (req, res) => {
    const {program_id, program_name, department_name, credits_required} = req.body;
    const {error} = programSchema(req.body);
    if(error) 
        res.send(error.details[0].message);

    else {
        const sql = `UPDATE program SET program_name = '${program_name}', credits_required = '${credits_required}', department_id = (SELECT department_id FROM department WHERE department_name = '${department_name}') WHERE program_id = '${program_id}'`;
    
        connection.query(sql, (err, results, feilds) => {
            if(err)
                res.send(err)
            else {
                res.send("Program updated successfully");
            }
        })
    }
})

program.delete("/deleteprogram", verifyToken, (req, res) => {
    const {program_id} = req.query;
    const sql = `DELETE FROM program WHERE program_id = '${program_id}'`
    connection.query(sql, (err, results, fields) => {
        if(err) 
            res.send(err)
        res.send("Program deleted successfully")
    })
})

module.exports = program;