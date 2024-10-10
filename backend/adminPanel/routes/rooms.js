const roomdata = require('express').Router();
const joi = require('joi');
const verifyToken = require('./verifyToken');
const connection = require('../connection');
const room_schema = require('./validation_schemas/room_schema');



roomdata.post("/addroom" , verifyToken, (req,res) => {
    const {room_id, room_number, capacity, department, building, is_lab} = req.body;

   const {error} = room_schema(req.body);
   if(error) {
    res.send(error.details[0].message)
    return;
   }

    const sql = `SELECT * FROM room WHERE room_number = '${room_number}' && department = '${department}'`
    connection.query(sql, (err, results, fields) => {
        if(err) {
            res.send(err)
        }

        else {
            if(results.length > 0) {
                res.send("room number in the department is already registered....")
            }

            else {
                
                const sql = `INSERT INTO room(room_number, capacity, department,  building, is_lab) VALUES('${room_number}', '${capacity}','${department}', '${building}', '${is_lab}')`

                connection.query(sql, (err, results, fields) => {
                    if(err) {
                        res.send(err)
                    }

                    else {
                        res.send("Room added successfully")
                    }
                })
            }
        }
    })
})



roomdata.get("/allrooms", verifyToken, (req, res) => {
    const sql = `SELECT * FROM room`;

    connection.query(sql, (err, results, fields) => {
        if(err) {
            res.send(err)
        }

        else {
            res.send(results)
        }
    })
})

roomdata.delete("/deleteroom", verifyToken, (req, res) => {
    const {room_id} = req.query;
    const sql = `DELETE FROM room WHERE room_id = '${room_id}'`;
    connection.query(sql, (err, results, fields) => {
        if(err) {
            res.send(err)
        }

        else {
            res.send("Room deleted successfully")
        }
    })
})

roomdata.put("/updateroom", verifyToken, (req, res) => {
    const {room_id, room_number, capacity, department, building, is_lab} = req.body;
    const {error} = room_schema(req.body);
    if(error) 
    res.send(error.details[0].message)

    else {

        const sql = `UPDATE room SET room_number = '${room_number}', capacity = '${capacity}' ,department = '${department}',  building = '${building}', is_lab = '${is_lab}' WHERE room_id = '${room_id}'`;
    
        connection.query(sql, (err, results, fields) => {
            if(err) 
                res.send(err)
            else {
                res.send("Room updated successfully")
            }
        })
    }

})

module.exports = roomdata;