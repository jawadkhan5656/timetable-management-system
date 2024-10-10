import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const OfferedSubjectTable = ({ offeredSubject }) => {
    return (
        <TableContainer component={Paper}>
        

        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject ID</TableCell>
            <TableCell>Program_Name</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>SpringFall</TableCell>
            <TableCell>Department_Name</TableCell>
            <TableCell>Course_Name</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Session_Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offeredSubject.map((offeredSubject) => (
            <TableRow key={offeredSubject.os_id}>
              <TableCell>{offeredSubject.os_id}</TableCell>
              <TableCell>{offeredSubject.program_name}</TableCell>
              <TableCell>{offeredSubject.year}</TableCell>
              <TableCell>{offeredSubject.springFall}</TableCell>
              <TableCell>{offeredSubject.department_name}</TableCell>
              <TableCell>{offeredSubject.course_name}</TableCell>
              <TableCell>{offeredSubject.batch}</TableCell>
              <TableCell>{offeredSubject.session_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      </TableContainer>
    )
}

export default OfferedSubjectTable
