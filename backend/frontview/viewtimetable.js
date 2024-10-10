const showtimetable = require('express').Router();
const connection = require('../adminPanel/connection');
const verifyToken = require('../adminPanel/routes/verifyToken');


showtimetable.get("/progdepid", (req, res) => {
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
            res.send(results)
        })
})

showtimetable.get("/sesid", (req, res) => {
    const sql = `SELECT 
        s.session_name,
        s.batch,
        cs.springFall,
        cs.year
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

showtimetable.get("/secid", (req, res) => {
    const sql = `SELECT section_name FROM section`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

showtimetable.get("/viewtimetable", (req, res) => {
   

    const {department_name, program_name, session_name, batch, springFall, year, section_name} = req.query;
    console.log(req.query);
    const sql = `SELECT
        a.alo_id,
        p.program_name,
        d.department_name,
        cs.springFall,
        cs.year,
        se.session_name,
        se.batch,
        t.teacher_name,
        s.section_name,
        r.room_number,
        c.course_name,
        a.time,
        a.day
    FROM
        allocation a
    JOIN
        program p ON a.program_id = p.program_id
    JOIN
        department d ON a.department_id = d.department_id
    JOIN
        current_session cs ON a.cs_id = cs.cs_id
    JOIN
        session se ON a.session_id = se.session_id
    JOIN
        teacher t ON a.teacher_id = t.teacher_id
    JOIN
        section s ON a.section_id = s.section_id
    JOIN
        available_rooms av ON a.av_id = av.av_id
    JOIN
        room r ON av.room_id = r.room_id
    JOIN
        offered_subjects os ON a.os_id = os.os_id
    JOIN
        course c ON os.course_id = c.course_id
    WHERE
        p.program_name = '${program_name}'
        AND d.department_name = '${department_name}'
        AND se.session_name = '${session_name}'
        AND se.batch = '${batch}'
        AND cs.springFall = '${springFall}'
        AND cs.year = '${year}'
        AND s.section_name = '${section_name}'`

        connection.query(sql, (err, results, fields) => {
            if(err)
                res.send(err)
            else {
                res.send(results)
            }
        })
});

showtimetable.get("/getteacher", verifyToken, (req, res) => {
    const sql = `SELECT teacher_name, d.department_name
    FROM teacher t JOIN department d ON t.department_id = d.department_id `
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})
showtimetable.get("/viewteachertable", verifyToken, (req, res) => {
    const { teacher_name, department_name } = req.query; // Use req.query for GET requests

    const sql = `
        SELECT
            p.program_name,
            d.department_name,
            s.section_name,
            r.room_number,
            c.course_name,
            a.time,
            a.day
        FROM
            allocation a
        JOIN
            program p ON a.program_id = p.program_id
        JOIN
            department d ON a.department_id = d.department_id
        JOIN
            section s ON a.section_id = s.section_id
        JOIN
            available_rooms av ON a.av_id = av.av_id
        JOIN
            room r ON av.room_id = r.room_id
        JOIN
            offered_subjects os ON a.os_id = os.os_id
        JOIN
            course c ON os.course_id = c.course_id
        WHERE
            a.teacher_id = (SELECT teacher_id FROM teacher WHERE teacher_name = ?)
            AND a.department_id = (SELECT department_id FROM department WHERE department_name = ?)`;

    connection.query(sql, [teacher_name, department_name], (err, results, fields) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
});


module.exports = showtimetable;
