const department = require('express').Router();
const connection = require('../connection');
const verifyToken = require('./verifyToken');
const departmentSchema = require('./validation_schemas/department_schema');
const semester = require('./semester');

department.post("/adddepartment", verifyToken, (req, res) => {
    const {department_id, department_name} = req.body;
    const {error} = departmentSchema(req.body);
    if(error) 
        res.send(error.details[0].message)
    
    const sql = `SELECT * FROM department WHERE department_id = '${department_id}'`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            if(results.length > 0 )
                res.send("department id is already registered....try another one")
            else {
                const sql = `INSERT INTO department(department_id, department_name) VALUES ('${department_id}', '${department_name}')`

                connection.query(sql, (err, results, fields) => {
                    if(err)
                        res.send(err)
                    res.send("Department added successfully")
                })
            }
        }
    })
    
})

department.get("/alldepartments", verifyToken, (req, res) => {
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send(results)
    })
})

department.put("/updatedepartment", verifyToken, (req, res) => {
    const {department_id, department_name} = req.body;
    const sql = `UPDATE department SET dname = '${department_name}' WHERE department_id = '${department_id}'`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
           res.send("Department updated succesfully")
        }
    })
})

department.delete("/deletedepartment", verifyToken, (req, res) => {
    const {department_id} = req.query;
    const sql = `DELETE FROM department WHERE department_id = '${department_id}'`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send("Department deleted successfully")
    })
})

module.exports = department;