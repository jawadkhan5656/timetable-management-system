import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const CourseTable = ({ courses }) => {
    return (
        <>

      <Table>
       <TableHead>
        <TableRow>

          <TableCell>Course Id</TableCell>
          <TableCell>Course Name</TableCell>
          <TableCell>Course Code</TableCell>
          <TableCell>Credits</TableCell>
          <TableCell>Department Name</TableCell>

        </TableRow>
       </TableHead>
       <TableBody>
        {courses.map((course, index) => (
          <TableRow key={index}>
            <TableCell>{course.course_id}</TableCell>
            <TableCell>{course.course_name}</TableCell>
            <TableCell>{course.course_code}</TableCell>
            <TableCell>{course.credits}</TableCell>
            <TableCell>{course.department_name}</TableCell>
          </TableRow>
        ))}
       </TableBody>
     </Table>

        </>
    )
}

export default CourseTable
