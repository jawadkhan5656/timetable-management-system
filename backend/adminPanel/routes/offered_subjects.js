const offeredSubject = require('express').Router();
const connection = require('../connection');
const verifyToken = require('./verifyToken');
const crypto = require('crypto')


offeredSubject.get("/getprogdepid", verifyToken, (req, res) => {
    const sql = `SELECT 
        p.program_name,
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


offeredSubject.get("/getsescsid", verifyToken, (req, res) => {
    const sql = `SELECT
        s.session_name,
        s.batch,
        cs.year,
        cs.springFall
    FROM
        current_session cs
    JOIN
        session s ON cs.session_id = s.session_id`;
        connection.query(sql, (err, results, fields) => {
            if(err)
                res.send(err)
            else {
                res.send(results)
            }
        })
})

offeredSubject.get("/getcourseid", verifyToken, (req, res) => {
    const sql = `SELECT course_name FROM course`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})



offeredSubject.post("/addoffersubject", verifyToken, (req, res) => {
    const { os_id, program_name, year, springFall, department_name, course_name, batch, session_name } = req.body;

    const dataString = `${springFall}-${year}-${department_name}-${session_name}-${batch}-${program_name}-${course_name}`;
    const hash = crypto.createHash('sha256').update(dataString).digest('hex');

    const sql = `SELECT * FROM allocation WHERE hash = '${hash}'`
   

    // const select = `
    //     SELECT 
    //         c.course_name,
    //         p.program_name,
    //         s.year,
    //         s.springFall,
    //         se.session_name,
    //         se.batch,
    //         d.department_name
    //     FROM 
    //         offered_subjects os
    //     JOIN
    //         course c ON os.course_id = c.course_id
    //     JOIN
    //         program p ON os.program_id = p.program_id
    //     JOIN
    //         current_session s ON os.cs_id = s.cs_id
    //     JOIN
    //         session se ON os.session_id = se.session_id
    //     JOIN
    //         department d ON os.department_id = d.department_id`
        
    
    connection.query(sql, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            if(results.length > 0)
                return res.send("This subject is already offered");
            else {
                const cond1 = `
                SELECT * FROM program 
                WHERE program_name = ? 
                AND department_id = (
                    SELECT department_id FROM department WHERE department_name = ?
                )`;
                connection.query(cond1, [program_name, department_name], (err, results) => {
                    if (err) return res.send(err);

            if (results.length === 0) {
                res.send("This program does not exist in the selected department");
            }
            else {
                const sql = `
                INSERT INTO offered_subjects (os_id, program_id, cs_id, department_id, course_id, session_id)
                VALUES (?, 
                    (SELECT program_id FROM program WHERE program_name = ? LIMIT 1),
                    (SELECT cs_id FROM current_session WHERE year = ? AND springFall = ? LIMIT 1),
                    (SELECT department_id FROM department WHERE department_name = ? LIMIT 1),
                    (SELECT course_id FROM course WHERE course_name = ? LIMIT 1),
                    (SELECT session_id FROM session WHERE session_name = ? AND batch = ? LIMIT 1)
                )`;
                connection.query(sql, [os_id, program_name, year, springFall, department_name, course_name, session_name, batch], (err, results) => {
                    if(err) 
                        res.send(err)
                    else {
                        res.send("Offered subject added successfully");
                    }
                })
            }
                })
            }
        }
    })
})


offeredSubject.get("/allofferedsubjects", verifyToken, (req, res) => {
    const sql = `SELECT
        os.os_id,
        p.program_name,
        cs.year,
        cs.springFall,
        d.department_name,
        c.course_name,
        s.session_name,
        s.batch
    FROM
        offered_subjects os
    JOIN
        program p ON os.program_id = p.program_id
    JOIN
        current_session cs ON os.cs_id = cs.cs_id
    JOIN
        department d ON os.department_id = d.department_id
    JOIN
        course c ON os.course_id = c.course_id
    JOIN
        session s ON os.session_id = s.session_id`;

        connection.query(sql, (err, results, fields) => {
            if(err)
                res.send(err)
            res.send(results)
        })
})

offeredSubject.delete("/deleteofferedsubject", verifyToken, (req, res) => {
    const {os_id} = req.query;
    const sql = `DELETE FROM offered_subjects WHERE os_id = '${os_id}'`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send("Offered subject deleted successfully")
    })
})

module.exports = offeredSubject;