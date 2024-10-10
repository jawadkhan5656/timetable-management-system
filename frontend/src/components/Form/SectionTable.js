import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const SectionTable = ({section}) => {
  console.log('Section data:', section)
    return (

      <TableContainer component={Paper}>
     <Table>
        <TableHead>
          <TableRow>
            <TableCell>Section ID</TableCell>
            <TableCell>Section Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {section.map((section) => (
            <TableRow key={section.section_id}>
              <TableCell>{section.section_id}</TableCell>
              <TableCell>{section.section_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

    )
}

export default SectionTable
