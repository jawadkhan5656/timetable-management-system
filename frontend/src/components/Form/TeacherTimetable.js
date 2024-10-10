import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const TeacherTimetable = ({ TeacherTimetable }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Program Name</TableCell>
          <TableCell>Department Name</TableCell>
          <TableCell>Section Name</TableCell>
          <TableCell>Course Name</TableCell>
          <TableCell>Day</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {TeacherTimetable.map((TeacherTable, index) => (
          <TableRow key={index}>
            <TableCell>{TeacherTable.program_name}</TableCell>
            <TableCell>{TeacherTable.department_name}</TableCell>
            <TableCell>{TeacherTable.section_name}</TableCell>
            <TableCell>{TeacherTable.course_name}</TableCell>
            <TableCell>{TeacherTable.day}</TableCell>
            <TableCell>{TeacherTable.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeacherTimetable;
