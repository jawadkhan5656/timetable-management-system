const allocation = require('express').Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const verifyToken = require('./verifyToken')
const connection = require('../connection')

allocation.post("/createtimetable", verifyToken, async (req, res) => {
    const { program_id, cs_id, department_id, section_id, teacher_id, av_id, os_id, session_id, time, day } = req.body;

    // Step 1: Create a string from the data fields
    // const dataString = `${program_id}-${cs_id}-${department_id}-${section_id}-${teacher_id}-${av_id}-${os_id}-${session_id}-${time}-${day}`;

     const dataString = `${teacher_id}-${av_id}-${time}-${day}`;
    
    // Step 2: Generate the hash
    const hash = crypto.createHash('sha256').update(dataString).digest('hex');


    // Step 3: Check for conflicts in the database      
    try {
        const select = `SELECT * FROM allocation WHERE hash = '${hash}'`
        await connection.query(select, async(err, results, fields) => {
            if(err)
                res.send(err)
            else {
                if(results.length > 0)
                    res.send("CONFLICT OCCURED...THIS TIMESLOT IS ALREADY OCCUPIED.....")

                else {
                    const sql = `
                    INSERT INTO allocation (program_id, cs_id, department_id, section_id, teacher_id, av_id, os_id, session_id, time, day, hash)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                        await connection.query(sql, [program_id, cs_id, department_id, section_id, teacher_id, av_id, os_id, session_id, time, day, hash]);
                
                        res.status(201).send("Timetable entry created successfully.");
                }
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the timetable.");
    }

})




module.exports = allocation;