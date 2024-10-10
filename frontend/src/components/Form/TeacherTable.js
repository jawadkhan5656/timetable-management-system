import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const TeacherTable = ({ teachers }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Teacher ID</TableCell>
            <TableCell>Teacher Name</TableCell>
            <TableCell>Department name</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher, index) => (
            <TableRow key={index}>
              <TableCell>{teacher.teacher_name}</TableCell>
              <TableCell>{teacher.teacher_name}</TableCell>
              <TableCell>{teacher.department_name}</TableCell>
              <TableCell>{teacher.designation}</TableCell>
              <TableCell>{teacher.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TeacherTable;
