import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const RoomTable = ({ rooms, onDeleteRoom }) => {
  console.log('Rooms data:', rooms);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room ID</TableCell>
            <TableCell>Room Number</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Building</TableCell>
            <TableCell>Is Lab</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.room_id}>                                               
              <TableCell>{room.room_id}</TableCell>
              <TableCell>{room.room_number}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.building}</TableCell>
              <TableCell>{room.is_lab ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => onDeleteRoom(room.room_id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomTable;
