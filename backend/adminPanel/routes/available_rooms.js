const availableRooms = require('express').Router();
const connection = require('../connection');
const verifyToken = require('./verifyToken');


availableRooms.get("/getcsid", verifyToken, (req, res) => {
    const sql = `SELECT springFall, year FROM current_session`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

availableRooms.get("/getroomids", verifyToken, (req, res) => {
    const sql = `SELECT room_number, department FROM room`;
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

availableRooms.post("/addavailablerooms", verifyToken, (req, res) => {
    const {av_id, springFall, year, room_number, department, start_time, end_time} = req.body;

    const sql = connection.query(`INSERT INTO available_rooms(av_id, cs_id, room_id, start_time, end_time) VALUES (?, (SELECT cs_id FROM current_session WHERE springFall = ? AND year = ?), (SELECT room_id FROM room WHERE room_number = ? AND department = ?), ?, ?)`, [av_id, springFall, year, room_number, department, start_time, end_time], (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.json("Available room added successfully")
        }
    })

})

availableRooms.get("/allavailablerooms", verifyToken, (req,  res) => {
    const sql = `SELECT 
        avr.av_id,
        avr.start_time,
        avr.end_time,
        r.room_number,
        r.building,
        r.department,
        cs.springFall,
        cs.year
    FROM
        available_rooms avr
    JOIN
        room r ON avr.room_id = r.room_id
    JOIN
        current_session cs on avr.cs_id = cs.cs_id`;

    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            res.send(results)
        }
    })
})

availableRooms.delete("/deleteavailableroom", verifyToken, (req, res) => {
    const {av_id} = req.query;
    const sql = `DELETE FROM available_rooms WHERE av_id = '${av_id}'`;
    connection.query(sql, (err, results, fields) => {
        if(err)
           return res.send(err)
        res.send("Available room deleted successfully");
    })
})
module.exports = availableRooms;