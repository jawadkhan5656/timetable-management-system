const teacherdata = require('express').Router();
const bcrypt = require('bcryptjs');
const verifyToken = require('./verifyToken');
const connection = require('../connection');
const teacher_schema = require('./validation_schemas/teacher_schema');

teacherdata.get("/getdepid", verifyToken, (req, res) => {
    const sql = `SELECT department_name FROM department`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send(results)
    })
})

teacherdata.post("/addteacher",verifyToken, (req, res) => {
    // res.send("order is placed successfully")
    const {teacher_id, teacher_name, department_name, designation, email} = req.body;
    const {error} = teacher_schema(req.body);
    if(error) {
        res.send(error.details[0].message)
    }

   else {
    const select = `SELECT * FROM teacher WHERE email = '${email}'`

    connection.query(select, async (err, results, fields) => {
        if(err) {
            res.send(err)
        }

        else{
            if(results.length > 0) {
                res.send("A teacher with current EMAIL is already registered")
            }

            else {
                const sql = connection.query(`INSERT INTO teacher(teacher_id, teacher_name, department_id, designation, email) VALUES(?, ?, (SELECT department_id FROM department WHERE department_name = ?), ?, ?)`, [teacher_id, teacher_name, department_name, designation, email], (err, results, fields) => {
                    if(err)
                        res.send(err)
                    res.send("Teacher added successfully")
                })

                
            }
        }
    })
   }
})


teacherdata.get("/allteachers", verifyToken, (req, res) => {
    // res.send("reached checkout")
    const sql = `SELECT 
        teacher_id,
        teacher_name,
        email,
        designation,
        d.department_name
    FROM
        teacher t
    JOIN
        department d ON t.department_id = d.department_id`;

    connection.query(sql, (err, results, fields) => {
        if(err) 
            console.log(err)
        else {
            res.send(results)
        }
    })
})

teacherdata.delete("/deleteteacher", verifyToken, (req, res) => {
    const {teacher_id} = req.query;
    const sql = `DELETE FROM teacher WHERE teacher_id = '${teacher_id}'`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send("Deleted successfully")
        }
    })
})


teacherdata.put("/updateteacher", verifyToken, (req, res) => {
    const {email, teacher_name, department_name, designation} = req.body;
    const {error} = teacher_schema(req.body);
    if(error) {
        res.send(error.details[0].message)
    }
    
    const sql = `UPDATE teacher SET teacher_name = '${teacher_name}', department_id = (SELECT department_id FROM department WHERE department_name = '${department_name}'), designation = '${designation}' WHERE email = '${email}'`;

    connection.query(sql, (err, results, fields) => {
        if(err) 
            res.send(err)
        else {
            res.send("Updated successfully")
        }
    })
})


module.exports = teacherdata;