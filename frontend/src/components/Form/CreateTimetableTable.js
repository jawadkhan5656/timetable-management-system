import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CreateTimetableTable = ({ timetable }) => {
    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>program Name</TableCell>
                    <TableCell>springFall</TableCell>
                    <TableCell>year</TableCell>
                    <TableCell>department Name</TableCell>
                    <TableCell>section Name</TableCell>
                    <TableCell>Teacher Name</TableCell>
                    <TableCell>Room Number</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>session Name</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Day</TableCell>
                    
                </TableRow>
            </TableHead>
            <TableBody>
                {timetable.map((timetable) => (
                    <TableRow key={timetable.timetable_id}>
                        <TableCell>{timetable.program_name}</TableCell>
                        <TableCell>{timetable.springFall}</TableCell>
                        <TableCell>{timetable.year}</TableCell>
                        <TableCell>{timetable.department_name}</TableCell>
                        <TableCell>{timetable.section_name}</TableCell>
                        <TableCell>{timetable.teacher_name}</TableCell>
                        <TableCell>{timetable.room_number}</TableCell>
                        <TableCell>{timetable.department}</TableCell>
                        <TableCell>{timetable.course_name}</TableCell>
                        <TableCell>{timetable.session_name}</TableCell>
                        <TableCell>{timetable.batch}</TableCell>
                        <TableCell>{timetable.time}</TableCell>
                        <TableCell>{timetable.day}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>

    )
}

export default CreateTimetableTable