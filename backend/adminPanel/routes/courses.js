const courseData = require('express').Router();
const joi = require('joi');
const verifyToken = require('./verifyToken');
const connection = require('../connection');
const course_schema = require('./validation_schemas/course_schema');

courseData.get("/getdepid", verifyToken, (req, res) => {
    const sql = `SELECT department_name FROM department`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

courseData.post("/addcourse", verifyToken, (req, res) => {
    const {course_id, course_code, course_name, credits, department_name} = req.body;
    const { error } = course_schema(req.body);
    if (error) {
        res.send(error.details[0].message)
    }

    else {
        const sql = `SELECT * FROM course WHERE course_code = '${course_code}'`;
        connection.query(sql, (err, results, fields) => {
            if (err)
                res.send(err)
            else {
                if (results.length > 0) {
                    res.send("course code is already registered....")
                }

                const sql = `INSERT INTO course(course_id, course_code, course_name, credits, department_id) VALUES(?, ?, ?, ?, (SELECT department_id FROM department WHERE department_name = ?))`

                connection.query(sql, [course_id, course_code, course_name, credits, department_name], (err, results, fields) => {
                    if (err)
                        res.send(err)
                    else {
                        res.send("Course added successfully")
                    }
                })
            }
        })
    }
})

courseData.get("/allcourses", verifyToken, (req, res) => {
    const sql = `SELECT
        course_id,
        course_name,
        course_code,
        credits,
        d.department_name
    FROM
        course c
    JOIN
        department d ON c.department_id = d.department_id`;

    connection.query(sql, (err, results, fields) => {
        if (err) {
            res.send(err)
        }

        else {
            res.send(results)
        }
    })
})

courseData.delete("/deletecourse", verifyToken, (req, res) => {
    const { course_id } = req.query;
    const sql = `DELETE FROM course WHERE course_id = '${course_id}'`;

    connection.query(sql, (err, results, fields) => {
        if (err)
            res.send(err)
        else {
            res.send("Course deleted successfully")
        }
    })
})

courseData.put("/updatecourse", verifyToken, (req, res) => {
    const {course_id, course_code, course_name, credits } = req.body;
    const { error } = course_schema(req.body);
    if (error) {
        res.send(error.details[0].message)
    }

    const sql = `UPDATE course SET course_name = ?, credits = ?, course_code = ? WHERE course_id = ?`;

    connection.query(sql, [course_name, credits, course_code, course_id], (err, results, fields) => {
        if (err)
            res.send(err)
        else {
            res.send("Course updated successfully")
        }
    })
})

module.exports = courseData;