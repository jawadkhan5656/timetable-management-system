import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const ProgramTable = ({ program }) => {
  console.log('Program data: ', program)
    return (

      <TableContainer component={Paper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Program ID</TableCell>
            <TableCell>Program Name</TableCell>
            <TableCell>Credits Required</TableCell>
            <TableCell>department_name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {program.map((program) => (
            <TableRow key={program.program_id}>
              <TableCell>{program.program_id}</TableCell>
              <TableCell>{program.program_name}</TableCell>
              <TableCell>{program.credits_required}</TableCell>
              <TableCell>{program.department_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

    )
}

export default ProgramTable
