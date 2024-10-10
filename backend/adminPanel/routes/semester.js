const semester = require('express').Router();
const verifyToken = require('./verifyToken');
const connection = require('../connection');
const semesterSchema = require('./validation_schemas/semester_schema');
const { verify } = require('jsonwebtoken');

semester.get("/getsessionid", verifyToken, (req, res) => {


  const sql = `SELECT session_name, batch FROM session`
  connection.query(sql, (err, results, fields) => {
    if(err)
        res.send(err)
    {
        res.send(results)
    }
  })  
})


semester.post("/addsemester", verifyToken, (req, res) => {
    const { springFall, batch, year, session_name } = req.body; // Make sure these are the right keys
    const { error } = semesterSchema(req.body);
    
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    const sql = `SELECT * FROM current_session WHERE springFall = '${springFall}' AND year = '${year}' AND session_id = (SELECT session_id FROM session WHERE batch = '${batch}' AND session_name = '${session_name}')`;
    
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (results.length > 0) {
                res.status(400).send("This semester is already registered");
            } else {
                const result = connection.query(
                    `INSERT INTO current_session(cs_id, session_id, year, springFall) 
                    VALUES(?, 
                           (SELECT session_id FROM session WHERE batch = ? AND session_name = ?), 
                           ?, 
                           ?)`,
                    [req.body.cs_id, batch, session_name, year, springFall],
                    (err) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.send("Current session added successfully");
                        }
                    }
                );
            }
        }
    });
});


    

semester.get("/allsemesters", verifyToken, (req, res) => {
   const sql = `
            SELECT 
                cs.cs_id, 
                cs.springFall, 
                cs.year, 
                s.batch,
                s.session_name
            FROM 
                current_session cs
            JOIN 
                session s ON cs.session_id = s.session_id;
        `;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send(results)
    })
})

semester.put("/updatesemester", verifyToken, (req, res) => {
    const {cs_id, springFall, year, batch, session_name} = req.body;
    const {error} = semesterSchema(req.body);
    if(error) {
        res.send(error.details[0].message)
        return;
    }
    const sql = `UPDATE current_session SET cs_id = '${cs_id}', springFall = '${springFall}', year = '${year}', session_id = (SELECT session_id FROM session WHERE batch = '${batch}' AND session_name = '${session_name}')`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send("Current session updated successfully")
    })
})

semester.delete("/deletesemester", verifyToken, (req, res) => {
    const {cs_id} = req.query;
    const sql = `DELETE FROM current_session WHERE cs_id = '${cs_id}'`;
    connection.query(sql, (err,results, fields) => {
        if(err)     res.send(err)
        res.send("Current session deleted successfully")
    })
})

module.exports = semester;