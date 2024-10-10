import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CurrentSessionTable = ({ currentSession }) => { // Set default to empty array
  console.log('semester data:', currentSession);
  
  // if (!Array.isArray(current_session) || current_session.length === 0) {
  //   return <div>No current sessions available.</div>; // Provide feedback if no data
  // }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Current ID</TableCell>
            <TableCell>Spring/Fall</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Session Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentSession.map((currentSession) => (
            <TableRow key={currentSession.cs_id}>
              <TableCell>{currentSession.cs_id}</TableCell>
              <TableCell>{currentSession.springFall}</TableCell> {/* Ensure this matches your API response */}
              <TableCell>{currentSession.batch}</TableCell>
              <TableCell>{currentSession.year}</TableCell>
              <TableCell>{currentSession.session_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrentSessionTable;
