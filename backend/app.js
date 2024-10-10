const express = require('express');
const adminRoutes = require('./adminPanel/register');
const teacherdata = require('./adminPanel/routes/teachers');
const roomdata = require('./adminPanel/routes/rooms');
const courseData = require('./adminPanel/routes/courses');
const programdata = require('./adminPanel/routes/program');
const semesterdata = require('./adminPanel/routes/semester');
const departmentData = require('./adminPanel/routes/department');
const sectionData = require('./adminPanel/routes/section');
const sessionData = require('./adminPanel/routes/session');
const timetable = require('./adminPanel/routes/allocation');
const timetableGenerator = require('./adminPanel/routes/timetable');
const viewtimetable = require('./frontview/viewtimetable');
const availableRooms = require('./adminPanel/routes/available_rooms');
const offered_subjects = require('./adminPanel/routes/offered_subjects');
const cors = require('cors');



const app = express();

const corsOption = {
    exposedHeaders : ["Content-Length","Authorization","token"],
    origin:'http://localhost:3000',
    credentials:true
}

const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(cors(corsOption));
app.use("/api/adminPanel", adminRoutes);
app.use("/api/adminPanel/teachers", teacherdata);
app.use("/api/adminPanel/rooms", roomdata);
app.use("/api/adminPanel/courses", courseData);
app.use('/api/adminPanel/programs', programdata);
app.use("/api/adminPanel/semester", semesterdata);
app.use("/api/adminPanel/department", departmentData);
app.use("/api/adminPanel/section", sectionData);
app.use("/api/adminPanel/session", sessionData);
app.use("/api/adminPanel/timetable", timetable);
app.use("/api/adminPanel/createtimetable", timetableGenerator);
app.use("/api/frontview", viewtimetable);
app.use("/api/adminPanel/availableRooms", availableRooms);
app.use("/api/adminPanel/offeredsubjects", offered_subjects);

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/", (req, res) => {

})

app.patch("/", (req, res) => {

})

app.delete("/", (req, res) => {

})

app.listen(PORT, () => console.log("api is listening on " + PORT));

