const session = require('express').Router();
const verifyToken = require('./verifyToken');
const connection = require('../connection');
const session_schema = require('./validation_schemas/session_schema');

session.post("/addsession", verifyToken, (req, res) => {
    const {session_id, batch, session_name} = req.body;
    const {error} = session_schema(req.body);
    if(error) {
        res.send(error.details[0].message)
        return;
    }

    const sql = `SELECT * FROM session WHERE batch = '${batch}' AND session_name = '${session_name}'`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        else {
            if(results.length > 0)
                res.send("session id is already registered ........")
            else {
                const sql = `INSERT INTO session (session_id, batch, session_name) VALUES ('${session_id}', '${batch}', '${session_name}')`
                
                connection.query(sql, (err, results, fields) => {
                    if(err)
                        res.send(err)
                    res.send("Session added successfully")
                })
            }
        }
    })
})

session.get("/allsessions", verifyToken, (req, res) => {
    const sql = `SELECT * FROM session`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send(results)
    })
})

session.put("/updatesession", verifyToken, (req, res) => {
    const {session_id, batch, session_name} = req.body;
    const {error} = session_schema(req.body);
    if(error)
        res.send(error.details[0].message)

    const sql = `UPDATE session SET batch = '${batch}', session_name = '${session_name}' WHERE session_id = '${session_id}'`;

    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send("Session updated successfully")
    })
})

session.delete("/deletesession", verifyToken, (req, res) => {
    const {session_id} = req.query;
    const sql = `DELETE FROM session WHERE session_id = '${session_id}'`
    connection.query(sql, (err, results, fields) => {
        if(err)
            res.send(err)
        res.send("Session deleted successfully")
    })
})

module.exports = session;