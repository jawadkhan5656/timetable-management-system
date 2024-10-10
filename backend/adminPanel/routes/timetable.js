const timetableGenerator = require('express').Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const verifyToken = require('./verifyToken')
const connection = require('../connection')

timetableGenerator.get("/getprogid", verifyToken, (req, res) => {
    const sql = `SELECT
        program_name 
    FROM
        program`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

timetableGenerator.get("/getcsid", verifyToken, (req, res) => {
    const sql = `SELECT springFall, year FROM current_session`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

timetableGenerator.get("/getdepid", verifyToken, (req, res) => {
    const sql = `SELECT department_name FROM department`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

timetableGenerator.get("/getsecid", verifyToken, (req, res) => {
    const sql = `SELECT section_name FROM section`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

timetableGenerator.get("/getteacherid", verifyToken, (req, res) => {
    const sql = `SELECT teacher_name FROM teacher`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

timetableGenerator.get("/getavrid", verifyToken, (req, res) => {
    const sql = `SELECT r.room_number, r.department 
    FROM
        available_rooms avr
    JOIN
        room r ON avr.room_id = r.room_id`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

timetableGenerator.get("/getosid", verifyToken, (req, res) => {
    const sql = `SELECT c.course_name
    FROM 
        offered_subjects os
    JOIN
        course c ON os.course_id = c.course_id`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

timetableGenerator.get("/getsesid", verifyToken, (req, res) => {
    const sql = `SELECT session_name, batch FROM session`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

timetableGenerator.post("/generate", verifyToken, async (req, res) => {
    const {program_name, springFall, year, department_name, section_name, teacher_name, room_number, department, course_name, session_name, batch, time, day} = req.body;

    // Step 1: Create a string from the data fields
    // const dataString = `${program_id}-${cs_id}-${department_id}-${section_id}-${teacher_id}-${av_id}-${os_id}-${session_id}-${time}-${day}`;

    const dataString = `${springFall}-${year}-${department_name}-${section_name}-${session_name}-${batch}-${program_name}-${time}-${day}`;
    const teacherstring = `${teacher_name}-${time}-${day}`;
    const roomstring = `${room_number}-${department}-${time}-${day}`;
    
    // Step 2: Generate the hash
    const hash = crypto.createHash('sha256').update(dataString).digest('hex');
    const teacherhash = crypto.createHash('sha256').update(teacherstring).digest('hex');
    const roomhash = crypto.createHash('sha256').update(roomstring).digest('hex');

    // Step 3: Check for conflicts in the database      
    try {
        const select = `SELECT * FROM allocation WHERE hash = '${hash}' OR teacherhash = '${teacherhash}' OR roomhash = '${roomhash}'`
        await connection.query(select, async(err, results, fields) => {
            if(err)
                res.send(err)
            else {
                if(results.length > 0)
                    res.send("CONFLICT OCCURED...THIS TIMESLOT IS ALREADY OCCUPIED.....")

                else {
                    const sql = `
                   INSERT INTO allocation (program_id, cs_id, department_id, section_id, teacher_id, av_id, os_id, session_id, time, day, hash, teacherhash, roomhash)
                        VALUES (
                        (SELECT program_id FROM program WHERE program_name = ? LIMIT 1), 
                        (SELECT cs_id FROM current_session WHERE springFall = ? AND year = ? LIMIT 1), 
                        (SELECT department_id FROM department WHERE department_name = ? LIMIT 1), 
                        (SELECT section_id FROM section WHERE section_name = ? LIMIT 1), 
                        (SELECT teacher_id FROM teacher WHERE teacher_name = ? LIMIT 1), 
                        (SELECT av.av_id FROM available_rooms av JOIN room r ON av.room_id = r.room_id WHERE r.room_number = ? AND r.department = ? LIMIT 1), 
                        (SELECT os.os_id FROM offered_subjects os JOIN course c ON os.course_id = c.course_id WHERE c.course_name = ? LIMIT 1), 
                        (SELECT session_id FROM session WHERE session_name = ? AND batch = ? LIMIT 1), 
                        ?, ?, ?, ?, ?
                        )`;
                        
                        await connection.query(sql, [program_name, springFall, year, department_name, section_name, teacher_name, room_number, department, course_name, session_name, batch, time, day, hash, teacherhash, roomhash], (err, results, fields) => {
                            if(err)
                                res.send(err)
                            else {
                                res.status(201).send("Timetable entry created successfully.");
                            }
                        });
                
                        
                }
            }
        })


    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the timetable.");
    }

})

timetableGenerator.delete("/deleterecord", verifyToken, (req, res) => {
    const {alo_id} = req.query;
    
    const sql = `DELETE FROM allocation WHERE alo_id = '${alo_id}'`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send("deleted successfuly")
        }
    })
})




module.exports = timetableGenerator;