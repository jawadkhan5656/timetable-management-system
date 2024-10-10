import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const AvailableTable = ({availableRoom}) => {
  console.log('AvailableRooms data', availableRoom )
    return (

      <TableContainer component={Paper} >
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Available Room ID</TableCell>
            <TableCell>SpringFall</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Room_number</TableCell>
            <TableCell>Building</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Start_Time</TableCell>
            <TableCell>End_Time</TableCell>
          </TableRow>
         </TableHead>
         <TableBody>
          {availableRoom.map((availableRoom) => (
            <TableRow key={availableRoom.av_id}>
              <TableCell>{availableRoom.av_id}</TableCell>
              <TableCell>{availableRoom.springFall}</TableCell>
              <TableCell>{availableRoom.year}</TableCell>
              <TableCell>{availableRoom.room_number}</TableCell>
              <TableCell>{availableRoom.building}</TableCell>
              <TableCell>{availableRoom.department}</TableCell>
              <TableCell>{availableRoom.start_time}</TableCell>
              <TableCell>{availableRoom.end_time}</TableCell>
            </TableRow>
          ))}
         </TableBody>
        </Table>
        </TableContainer>

    )
}

export default AvailableTable;
